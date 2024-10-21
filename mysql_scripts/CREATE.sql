CREATE DATABASE BOOKSTORE_CCG; -- creando la base de datos.
USE BOOKSTORE_CCG;

CREATE TABLE BOOK ( -- creando la tabla BOOK.
	BOOKID int unsigned auto_increment primary key,
    TITLE varchar(63),
    DESCRIPTION varchar(255),
    STOCK int,
    SALEPRICE decimal(10,2),
    AVAILABLE bit(1) default b'1'
);

SELECT * FROM BOOK;