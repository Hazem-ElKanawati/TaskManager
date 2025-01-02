-- Insert Users
INSERT INTO users (username, password) VALUES ('john_doe', 'password123');
INSERT INTO users (username, password) VALUES ('jane_doe', 'securepass');

-- Insert Categories for john_doe (user_id = 1)
INSERT INTO category (name, description, user_id) VALUES ('Work', 'Tasks related to office work', 1);
INSERT INTO category (name, description, user_id) VALUES ('Personal', 'Personal to-dos and errands', 1);

-- Insert Categories for jane_doe (user_id = 2)
INSERT INTO category (name, description, user_id) VALUES ('Finance', 'Financial planning', 2);
INSERT INTO category (name, description, user_id) VALUES ('Shopping', 'Shopping list', 2);

-- Insert Tasks for john_doe in 'Work' category (category_id = 1)
INSERT INTO task (name, description, completed, category_id) VALUES ('Finish project report', 'Due by Friday', false, 1);
INSERT INTO task (name, description, completed, category_id) VALUES ('Prepare slides', 'For the next meeting', true, 1);

-- Insert Tasks for john_doe in 'Personal' category (category_id = 2)
INSERT INTO task (name, description, completed, category_id) VALUES ('Grocery shopping', 'Buy essentials', false, 2);
INSERT INTO task (name, description, completed, category_id) VALUES ('Call plumber', 'Fix the leaking pipe', false, 2);
