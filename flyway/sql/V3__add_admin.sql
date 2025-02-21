INSERT INTO users (email, admin, password)
SELECT 'admin@admin.com', true, '$2a$10$qOFgudHrabyBzfwERhw7neYV969Pn3FUJF/3J0BgLlz8tzGcm8Eha'
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'admin@admin.com'
);
