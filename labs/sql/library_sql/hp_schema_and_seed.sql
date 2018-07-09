DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS join_table_students_subjects;

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(40),
  last_name VARCHAR(40),
  house_id INT
);

CREATE TABLE subjects (
  id SERIAL PRIMARY KEY,
  subjects VARCHAR(55)
);

CREATE TABLE join_table_students_subjects (
  id SERIAL PRIMARY KEY,
  student_id INT,
  subject_id INT
);

INSERT INTO students VALUES (1,	'Harry',	'Potter',	1);
INSERT INTO students VALUES (2,	'Ron',	'Weasly',	1);
INSERT INTO students VALUES (3,	'Hermionie',	'Granger',	1);
INSERT INTO students VALUES (4,	'Draco',	'Malfoy',	4);

INSERT INTO subjects  VALUES (1,	'Charms');
INSERT INTO subjects  VALUES (2,	'Potions');
INSERT INTO subjects  VALUES (3,	'Herbology');
INSERT INTO subjects  VALUES (4,	'Defense Against the Dark Arts');
INSERT INTO subjects  VALUES (5,	'Quiddich');



INSERT INTO join_table_students_subjects VALUES (1,	1, 4);
INSERT INTO join_table_students_subjects VALUES (2,	3, 1);
INSERT INTO join_table_students_subjects VALUES (3,	3, 2);
INSERT INTO join_table_students_subjects VALUES (4,	1, 5);
INSERT INTO join_table_students_subjects VALUES (5,	2, 5);


SELECT first_name, last_name, subjects                                             
FROM join_table_students_subjects AS j
JOIN subjects ON j.subject_id = subjects.id
JOIN students ON j.student_id = students.id
WHERE students.first_name = 'Harry';

SELECT name, SUM(amount) AS total
  FROM orders
  JOIN customers ON orders.customer_id = customers.id
  GROUP BY customers.name;