CREATE DATABASE CITROSWEB CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci';
USE CITROSWEB;

-- **************************************************************************************************************
-- create table --
CREATE TABLE ACCOUNT (
    accountID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,			-- Mã tài khoản
    userName VARCHAR(40),										-- Tên đăng nhập
    password VARCHAR(40),										-- Mật khẩu
    permission VARCHAR(40),										-- Quyền hạn
    userID INT													-- Mã người dùng
) ENGINE=INNODB;

-- Thuộc tính chuyên môn đẩy sang 1 bảng riêng
CREATE TABLE USER (
    userID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,				-- Mã người dùng
    surname VARCHAR(40),										-- Họ
    forename VARCHAR(40),										-- Tên
    gender VARCHAR(10),											-- Giới tính
    dateOfBirth DATE,											-- Ngày sinh
    email VARCHAR(40),											-- Email
    phoneNumber VARCHAR(10),									-- Số điện thoại
    idNumber VARCHAR(15),										-- CMND/CCCD
    address VARCHAR(50),										-- Địa chỉ
    job VARCHAR(40),											-- Nghề nghiệp
    description TEXT,											-- Mô tả bản thân
    avatar TEXT 												-- Ảnh đại diện
) ENGINE=INNODB;

CREATE TABLE PROJECT (
    projectID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,			-- Mã dự án
    projectName VARCHAR(40),									-- Tên dự án
    projectOwner INT,											-- Mã chủ dự án (Mã người dùng)
    description TEXT,											-- Mô tả dự án
    startTime DATE,												-- Thời gian bắt đầu
    endTime DATE,												-- Thời gian kết thúc	
    maxParticipantAmount INT,									-- Số người tham gia tối đa
    gitHubLink TEXT												-- Link GitHub của đồ án
) ENGINE=INNODB;

CREATE TABLE PARTICIPATE (
    userID INT,													-- Mã người dùng tham gia dự án
    projectID INT,												-- Mã dự án
    salary INT,													-- Tiền lương tham gia
    totalTime INT												-- Tổng số thời gian
) ENGINE=INNODB;

CREATE TABLE PROGRESS (
    progressID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,			-- Mã tiến độ
    projectID INT,												-- Mã dự án
    task VARCHAR(40),											-- Công việc
    startTime DATE,												-- Thời gian bắt đầu
    endTime DATE,												-- Thời gian kết thúc
    completedPercentage FLOAT 									-- Phần trăm hoàn thành
) ENGINE=INNODB;

CREATE TABLE MAJOR (
    majorID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,			-- Mã chuyên ngành
    majorName VARCHAR(40),										-- Tên chuyên ngành
    description TEXT											-- Mô tả
) ENGINE=INNODB;

CREATE TABLE USER_MAJOR (
    userID INT,													-- Mã người dùng
    majorID INT													-- Mã chuyên ngành
) ENGINE=INNODB;

CREATE TABLE PROJECT_MAJOR (
    projectID INT,												-- Mã dự án
    majorID INT													-- Mã chuyên ngành
) ENGINE=INNODB;

CREATE TABLE HISTORY (
    historyID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,			-- Mã lịch sử
    userID INT,													-- Mã người dùng
    projectID INT,												-- Mã dự án
    rate VARCHAR(10) 											-- Đánh giá
) ENGINE=INNODB;

CREATE TABLE CONTACT_INFO (
    contactInfoID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,		-- Mã thông tin liên hệ
    userID INT,													-- Mã người dùng
    Platform VARCHAR(10),										-- Nền tảng (face, gmail, twitter, ...)
    link TEXT													-- Đường dẫn
) ENGINE=INNODB;

-- foreign key --
-- ACCOUNT
ALTER TABLE ACCOUNT ADD CONSTRAINT ACCOUNT_USER_FK FOREIGN KEY(userID) REFERENCES USER(userID);

-- PROJECT
ALTER TABLE PROJECT ADD CONSTRAINT PROJECT_USER_FK FOREIGN KEY(projectOwner) REFERENCES USER(userID);

-- PARTICIPATE
ALTER TABLE PARTICIPATE ADD CONSTRAINT PARTICIPATE_USER_FK FOREIGN KEY(userID) REFERENCES USER(userID);
ALTER TABLE PARTICIPATE ADD CONSTRAINT PARTICIPATE_PROJECT_FK FOREIGN KEY(projectID) REFERENCES PROJECT(projectID);

-- PROGRESS
ALTER TABLE PROGRESS ADD CONSTRAINT PROGRESS_PROJECT_FK FOREIGN KEY(projectID) REFERENCES PROJECT(projectID);

-- USER_MAJOR
ALTER TABLE USER_MAJOR ADD CONSTRAINT UM_USER_FK FOREIGN KEY(userID) REFERENCES USER(userID);
ALTER TABLE USER_MAJOR ADD CONSTRAINT UM_MAJOR_FK FOREIGN KEY(majorID) REFERENCES MAJOR(majorID);

-- PROJECT_MAJOR
ALTER TABLE PROJECT_MAJOR ADD CONSTRAINT PM_PROJECT_FK FOREIGN KEY(projectID) REFERENCES PROJECT(projectID);
ALTER TABLE PROJECT_MAJOR ADD CONSTRAINT PM_MAJOR_FK FOREIGN KEY(majorID) REFERENCES MAJOR(majorID);

-- HISTORY
ALTER TABLE HISTORY ADD CONSTRAINT HISTORY_USER_FK FOREIGN KEY(userID) REFERENCES USER(userID);
ALTER TABLE HISTORY ADD CONSTRAINT HISTORY_PROJECT_FK FOREIGN KEY(projectID) REFERENCES PROJECT(projectID);

-- CONTACT_INFO
ALTER TABLE CONTACT_INFO ADD CONSTRAINT CONTACT_USER_FK FOREIGN KEY(userID) REFERENCES USER(userID);

-- insert CHUYENNGANH
INSERT INTO MAJOR (majorName, description) VALUES ('NodeJS', 'Lập trình sử dụng NodeJS');
INSERT INTO MAJOR (majorName, description) VALUES ('ReactJS', 'Lập trình sử dụng ReactJS');

-- insert NGUOIDUNG
INSERT INTO USER (surname, forename, gender, dateOfBirth, email, phoneNumber, idNumber, address, job, description)
VALUES('Nguyễn Gia', 'Bảo', 'Nam', '2002-11-05', '20520406@gm.uit.edu.vn', '0967904069', '123456789123','fdjskfhsdkjfh', 'Back-end developer', '');	

INSERT INTO USER (surname, forename, gender, dateOfBirth, email, phoneNumber, idNumber, address, job, description)
VALUES('Nguyễn Huỳnh Gia', 'Huy', 'Nam', '2002-11-08', '20520514@gm.uit.edu.vn', '0987654321', '321123456789','ghsfdgdcvgbdcdg', 'Front-end developer', '');

-- insert PROJECT
INSERT INTO PROJECT (projectName, projectOwner, description, startTime, endTime, maxParticipantAmount, gitHubLink)
VALUES('Web tìm kiếm thành viên dự án', '1', 'Web buff bẩn làm đại cho qua môn', '2023-02-27', '2023-06-10', '2', 'https://github.com/ngb0511/SE121.N21-DoAn1-HE_THONG_HO_TRO_TIM_KIEM_DOI_NHOM_DU_AN');

INSERT INTO PROJECT (projectName, projectOwner, description, startTime, endTime, maxParticipantAmount, gitHubLink)
VALUES('Bảo trì web bán đồ điện tử', '2', 'Web buff bẩn làm đại cho qua môn', '2023-02-27', '2023-06-10', '4', '');