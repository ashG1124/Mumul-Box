CREATE TABLE `User` (
	`user_id`	VARCHAR(50)	NOT NULL,
	`nickname`	VARCHAR(50) UNIQUE	NOT NULL,
	`profile_img`	TEXT	NULL,
	`bio`	VARCHAR(255)	NULL,
	`status`	ENUM	NOT NULL,
	`created_at`	TIMESTAMP	NOT NULL	DEFAULT DEFAULT NOW(),
	`email`	TEXT	NOT NULL	COMMENT 'UNIQUE',
	`password`	VARCHAR(25)	NOT NULL,
	`role`	ENUM	NOT NULL,
	`suspended_until`	TIMESTAMP	NULL,
	`is_nori_enabled`	BOOLEAN	NOT NULL,
	`share_token`	TEXT	NOT NULL
);

CREATE TABLE `BadWord` (
	`id`	BIGINT	NOT NULL,
	`word`	VARCHAR(10)	NOT NULL,
	`created_at`	TIMESTAMP	NOT NULL
);

CREATE TABLE `Sanction` (
	`sanction_id`	BIGINT	NOT NULL,
	`user_id`	VARCHAR(50)	NOT NULL,
	`type`	ENUM	NOT NULL,
	`end_date`	TIMESTAMP	NULL,
	`reason`	VARCHAR(255)	NOT NULL,
	`created_at`	TIMESTAMP	NOT NULL	DEFAULT NOW()
);

CREATE TABLE `Answer` (
	`answer_id`	BIGINT	NOT NULL,
	`question_id`	BIGINT	NOT NULL,
	`content`	TEXT	NOT NULL,
	`view_count`	BOOLEAN	NOT NULL	DEFAULT 0,
	`is_edited`	BOOLEAN	NOT NULL	DEFAULT FALSE,
	`created_at`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`updated_at`	TIMESTAMP	NULL
);

CREATE TABLE `Question` (
	`question_id`	BIGINT	NOT NULL,
	`sender_id`	VARCHAR(50)	NOT NULL,
	`receiver_id`	VARCHAR(50)	NOT NULL,
	`content`	TEXT	NOT NULL,
	`is_anonymous`	BOOLEAN	NOT NULL	DEFAULT TRUE,
	`status`	ENUM	NOT NULL,
	`created_at`	TIMESTAMP	NOT NULL
);

CREATE TABLE `Report` (
	`report_id`	BIGINT	NOT NULL,
	`reporter_id`	VARCHAR(50)	NOT NULL,
	`target_type`	ENUM	NOT NULL,
	`target_id`	BIGINT	NOT NULL,
	`reason`	VARCHAR(255)	NOT NULL,
	`created_at`	TIMESTAMP	NOT NULL	DEFAULT NOW(),
	`status`	ENUM	NOT NULL
);

CREATE TABLE `Notification` (
	`id`	BIGINT	NOT NULL,
	`receiver_id`	VARCHAR(50)	NOT NULL,
	`type`	ENUM	NOT NULL,
	`message`	TEXT	NOT NULL,
	`related_id`	BIGINT	NOT NULL,
	`is_read`	BOOLEAN	NOT NULL	DEFAULT False,
	`created_at`	TIMESTAMP	NOT NULL
);

ALTER TABLE `User` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `BadWord` ADD CONSTRAINT `PK_BADWORD` PRIMARY KEY (
	`id`
);

ALTER TABLE `Sanction` ADD CONSTRAINT `PK_SANCTION` PRIMARY KEY (
	`sanction_id`
);

ALTER TABLE `Answer` ADD CONSTRAINT `PK_ANSWER` PRIMARY KEY (
	`answer_id`
);

ALTER TABLE `Question` ADD CONSTRAINT `PK_QUESTION` PRIMARY KEY (
	`question_id`
);

ALTER TABLE `Report` ADD CONSTRAINT `PK_REPORT` PRIMARY KEY (
	`report_id`
);

ALTER TABLE `Notification` ADD CONSTRAINT `PK_NOTIFICATION` PRIMARY KEY (
	`id`
);

