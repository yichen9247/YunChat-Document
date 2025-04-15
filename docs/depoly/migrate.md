# 更新迁移

由于部分版本更新内容较大，数据库的结构也发生了变化，下面是一些版本的数据库迁移脚本，无需备份数据库，直接执行代码即可。

::: details 2.2.X -> 2.3.X
```sql
ALTER TABLE handsock_user ENGINE=InnoDB;
ALTER TABLE handsock_banner ENGINE=InnoDB;
ALTER TABLE handsock_notice ENGINE=InnoDB;
ALTER TABLE handsock_system ENGINE=InnoDB;
ALTER TABLE handsock_upload ENGINE=InnoDB;
ALTER TABLE handsock_report ENGINE=InnoDB;
ALTER TABLE handsock_message ENGINE=InnoDB;
ALTER TABLE handsock_channel ENGINE=InnoDB;

ALTER TABLE handsock_user 
DROP COLUMN taboo,
DROP COLUMN email,
DROP COLUMN is_robot,
DROP COLUMN is_admin,
ADD COLUMN qq_id varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER nick,
ADD COLUMN status int(1) NOT NULL DEFAULT '0' AFTER qq_id,
ADD COLUMN permission int(1) NOT NULL DEFAULT '0' AFTER password,
MODIFY COLUMN avatar text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL;

UPDATE handsock_user 
SET permission = CASE 
    WHEN uid = 2400442120 THEN 1
    WHEN uid = 2400408600 THEN 2
    ELSE 0 
END;

CREATE TABLE handsock_report_new (
    `rid` int(11) NOT NULL AUTO_INCREMENT,
    `sid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `reason` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `deleted` int(1) DEFAULT '0',
    `reporter_id` bigint(20) NOT NULL,
    `reported_id` bigint(20) NOT NULL,
    PRIMARY KEY (rid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO handsock_report_new (sid, time, reason, deleted, reporter_id, reported_id)
SELECT sid, time, LEFT(reason, 50), deleted, reporter_id, reported_id 
FROM handsock_report;

DROP TABLE handsock_report;
RENAME TABLE handsock_report_new TO handsock_report;

ALTER TABLE handsock_message 
MODIFY COLUMN content varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL,
ADD INDEX idx_uid (uid),
ADD INDEX idx_gid (gid),
ADD CONSTRAINT fk_message_user FOREIGN KEY (uid) REFERENCES handsock_user(uid) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_message_channel FOREIGN KEY (gid) REFERENCES handsock_channel(gid) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE handsock_report 
ADD INDEX idx_reporter (reporter_id),
ADD INDEX idx_reported (reported_id),
ADD CONSTRAINT fk_report_reporter FOREIGN KEY (reporter_id) REFERENCES handsock_user(uid) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_report_reported FOREIGN KEY (reported_id) REFERENCES handsock_user(uid) ON DELETE CASCADE ON UPDATE CASCADE;

UPDATE handsock_system 
SET value = '2.3.0-B15' 
WHERE yid = 5 AND name = 'version';
```
:::