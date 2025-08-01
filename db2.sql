-- Portfolio Multi-Tenant Database Schema
-- Optimized for performance, scalability, and maintainability

-- ===============================
-- 1. USERS & AUTHENTICATION
-- ===============================

CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email_verified_at TIMESTAMP NULL,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP NULL,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

CREATE TABLE user_profiles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    display_name VARCHAR(100) NULL,
    bio TEXT NULL,
    profile_picture VARCHAR(500) NULL,
    phone VARCHAR(20) NULL,
    location VARCHAR(255) NULL,
    website_url VARCHAR(500) NULL,
    social_links JSON NULL, -- {linkedin, github, twitter, etc.}
    portfolio_slug VARCHAR(100) UNIQUE NULL, -- For custom URLs
    is_public BOOLEAN DEFAULT TRUE,
    seo_title VARCHAR(255) NULL,
    seo_description TEXT NULL,
    theme_settings JSON NULL, -- Theme customization
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_portfolio_slug (portfolio_slug),
    INDEX idx_is_public (is_public),
    FULLTEXT idx_search (full_name, display_name, bio)
);

-- ===============================
-- 2. SKILLS MANAGEMENT
-- ===============================

CREATE TABLE skill_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(100) NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_sort_order (sort_order)
);

CREATE TABLE skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    icon VARCHAR(100) NULL,
    color VARCHAR(7) NULL, -- Hex color
    is_trending BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES skill_categories(id) ON DELETE SET NULL,
    INDEX idx_category_id (category_id),
    INDEX idx_slug (slug),
    INDEX idx_trending (is_trending),
    UNIQUE KEY unique_skill_category (name, category_id)
);

CREATE TABLE user_skills (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    skill_id INT NOT NULL,
    proficiency_level ENUM('beginner', 'intermediate', 'advanced', 'expert') NOT NULL,
    years_experience TINYINT UNSIGNED NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_skill (user_id, skill_id),
    INDEX idx_user_featured (user_id, is_featured),
    INDEX idx_proficiency (proficiency_level),
    INDEX idx_sort_order (sort_order)
);

-- ===============================
-- 3. EDUCATION
-- ===============================

CREATE TABLE education (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    degree_type ENUM('bachelor', 'master', 'phd', 'diploma', 'certificate', 'bootcamp', 'other') NOT NULL,
    field_of_study VARCHAR(255) NOT NULL,
    institution_name VARCHAR(255) NOT NULL,
    start_year YEAR NOT NULL,
    end_year YEAR NULL,
    is_current BOOLEAN DEFAULT FALSE,
    grade VARCHAR(50) NULL,
    description TEXT NULL,
    achievements JSON NULL, -- Array of achievements
    logo_url VARCHAR(500) NULL,
    location VARCHAR(255) NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_degree_type (degree_type),
    INDEX idx_years (start_year, end_year),
    INDEX idx_sort_order (sort_order),
    FULLTEXT idx_search (field_of_study, institution_name)
);

-- ===============================
-- 4. EXPERIENCE
-- ===============================

CREATE TABLE experience (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    company_logo VARCHAR(500) NULL,
    employment_type ENUM('full_time', 'part_time', 'freelance', 'contract', 'internship') DEFAULT 'full_time',
    location VARCHAR(255) NULL,
    is_remote BOOLEAN DEFAULT FALSE,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT NULL,
    achievements JSON NULL, -- Array of key achievements
    technologies_used JSON NULL, -- Array of tech/skills used
    company_url VARCHAR(500) NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_employment_type (employment_type),
    INDEX idx_dates (start_date, end_date),
    INDEX idx_current (is_current),
    INDEX idx_sort_order (sort_order),
    FULLTEXT idx_search (job_title, company_name, description)
);

-- ===============================
-- 5. PROJECTS PORTFOLIO
-- ===============================

CREATE TABLE project_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NULL,
    color VARCHAR(7) NULL,
    icon VARCHAR(100) NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_sort_order (sort_order)
);

CREATE TABLE projects (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    category_id INT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    brief_description TEXT NOT NULL,
    detailed_description LONGTEXT NULL,
    status ENUM('completed', 'in_progress', 'on_hold', 'cancelled') DEFAULT 'completed',
    project_type ENUM('personal', 'professional', 'academic', 'open_source') DEFAULT 'personal',
    main_image VARCHAR(500) NULL,
    demo_url VARCHAR(500) NULL,
    repository_url VARCHAR(500) NULL,
    case_study_url VARCHAR(500) NULL,
    start_date DATE NULL,
    end_date DATE NULL,
    client_name VARCHAR(255) NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    view_count INT UNSIGNED DEFAULT 0,
    sort_order INT DEFAULT 0,
    seo_title VARCHAR(255) NULL,
    seo_description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES project_categories(id) ON DELETE SET NULL,
    UNIQUE KEY unique_user_slug (user_id, slug),
    INDEX idx_user_id (user_id),
    INDEX idx_category_id (category_id),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured),
    INDEX idx_published (is_published),
    INDEX idx_dates (start_date, end_date),
    INDEX idx_sort_order (sort_order),
    FULLTEXT idx_search (title, brief_description, detailed_description)
);

CREATE TABLE project_images (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    project_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255) NULL,
    caption TEXT NULL,
    is_main BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    INDEX idx_project_id (project_id),
    INDEX idx_main (is_main),
    INDEX idx_sort_order (sort_order)
);

CREATE TABLE project_technologies (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    project_id BIGINT NOT NULL,
    skill_id INT NOT NULL,
    role ENUM('primary', 'secondary', 'minor') DEFAULT 'secondary',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    UNIQUE KEY unique_project_tech (project_id, skill_id),
    INDEX idx_project_id (project_id),
    INDEX idx_role (role)
);

-- ===============================
-- 6. LANGUAGES
-- ===============================

CREATE TABLE languages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(5) NOT NULL UNIQUE, -- ISO language codes
    name VARCHAR(100) NOT NULL UNIQUE,
    native_name VARCHAR(100) NULL,
    flag_emoji VARCHAR(10) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_code (code)
);

CREATE TABLE user_languages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    language_id INT NOT NULL,
    proficiency ENUM('native', 'fluent', 'advanced', 'intermediate', 'beginner') NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_language (user_id, language_id),
    INDEX idx_user_id (user_id),
    INDEX idx_proficiency (proficiency),
    INDEX idx_sort_order (sort_order)
);

-- ===============================
-- 7. ANALYTICS & TRACKING
-- ===============================

CREATE TABLE portfolio_views (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    visitor_ip VARCHAR(45) NULL,
    user_agent TEXT NULL,
    referrer VARCHAR(500) NULL,
    country VARCHAR(2) NULL,
    city VARCHAR(100) NULL,
    device_type ENUM('desktop', 'mobile', 'tablet') NULL,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_viewed_at (viewed_at),
    INDEX idx_country (country),
    INDEX idx_device_type (device_type)
);

CREATE TABLE project_views (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    project_id BIGINT NOT NULL,
    visitor_ip VARCHAR(45) NULL,
    user_agent TEXT NULL,
    referrer VARCHAR(500) NULL,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    INDEX idx_project_id (project_id),
    INDEX idx_viewed_at (viewed_at)
);

-- ===============================
-- 8. CONTACT & LEADS
-- ===============================

CREATE TABLE contact_messages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    portfolio_user_id BIGINT NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    sender_company VARCHAR(255) NULL,
    subject VARCHAR(255) NOT NULL,
    message LONGTEXT NOT NULL,
    sender_ip VARCHAR(45) NULL,
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    priority ENUM('low', 'normal', 'high') DEFAULT 'normal',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (portfolio_user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_portfolio_user (portfolio_user_id),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_created_at (created_at),
    FULLTEXT idx_search (sender_name, sender_email, subject, message)
);

-- ===============================
-- 9. SYSTEM TABLES
-- ===============================

CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    key_name VARCHAR(100) NOT NULL UNIQUE,
    value TEXT NOT NULL,
    description TEXT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_key (key_name),
    INDEX idx_public (is_public)
);

CREATE TABLE user_sessions (
    id VARCHAR(128) PRIMARY KEY,
    user_id BIGINT NOT NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    payload LONGTEXT NOT NULL,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_last_activity (last_activity)
);

-- ===============================
-- 10. SEED DATA
-- ===============================

-- Insert default skill categories
INSERT INTO skill_categories (name, slug, icon, sort_order) VALUES
('Programming Languages', 'programming-languages', 'code', 1),
('Frontend Development', 'frontend-development', 'monitor', 2),
('Backend Development', 'backend-development', 'server', 3),
('Mobile Development', 'mobile-development', 'smartphone', 4),
('Database', 'database', 'database', 5),
('DevOps & Cloud', 'devops-cloud', 'cloud', 6),
('Design', 'design', 'palette', 7),
('Soft Skills', 'soft-skills', 'users', 8);

-- Insert common skills
INSERT INTO skills (category_id, name, slug, color) VALUES
(1, 'JavaScript', 'javascript', '#F7DF1E'),
(1, 'Python', 'python', '#3776AB'),
(1, 'Java', 'java', '#ED8B00'),
(1, 'TypeScript', 'typescript', '#3178C6'),
(2, 'React', 'react', '#61DAFB'),
(2, 'Vue.js', 'vuejs', '#4FC08D'),
(2, 'Angular', 'angular', '#DD0031'),
(3, 'Node.js', 'nodejs', '#339933'),
(3, 'Express.js', 'expressjs', '#000000'),
(5, 'MySQL', 'mysql', '#4479A1'),
(5, 'PostgreSQL', 'postgresql', '#336791'),
(5, 'MongoDB', 'mongodb', '#47A248');

-- Insert common languages
INSERT INTO languages (code, name, native_name, flag_emoji) VALUES
('en', 'English', 'English', '🇺🇸'),
('es', 'Spanish', 'Español', '🇪🇸'),
('fr', 'French', 'Français', '🇫🇷'),
('de', 'German', 'Deutsch', '🇩🇪'),
('ar', 'Arabic', 'العربية', '🇸🇦'),
('zh', 'Chinese', '中文', '🇨🇳'),
('ja', 'Japanese', '日本語', '🇯🇵'),
('pt', 'Portuguese', 'Português', '🇵🇹'),
('ru', 'Russian', 'Русский', '🇷🇺'),
('hi', 'Hindi', 'हिन्दी', '🇮🇳');

-- Insert default project categories
INSERT INTO project_categories (name, slug, description, color, sort_order) VALUES
('Web Applications', 'web-applications', 'Full-stack web applications and websites', '#3B82F6', 1),
('Mobile Apps', 'mobile-apps', 'iOS and Android mobile applications', '#10B981', 2),
('Desktop Software', 'desktop-software', 'Desktop applications and tools', '#8B5CF6', 3),
('API & Backend', 'api-backend', 'APIs, microservices, and backend systems', '#F59E0B', 4),
('Data Science', 'data-science', 'Data analysis, ML, and AI projects', '#EF4444', 5),
('Open Source', 'open-source', 'Open source contributions and projects', '#6B7280', 6);

-- Insert system settings
INSERT INTO settings (key_name, value, description, is_public) VALUES
('site_name', 'Portfolio Hub', 'The name of the portfolio platform', TRUE),
('default_theme', 'modern', 'Default theme for new portfolios', FALSE),
('max_projects_per_user', '50', 'Maximum projects per user account', FALSE),
('enable_analytics', 'true', 'Enable portfolio analytics tracking', FALSE);

-- ===============================
-- 11. PERFORMANCE OPTIMIZATIONS
-- ===============================

-- Create composite indexes for common queries
CREATE INDEX idx_user_skills_featured ON user_skills (user_id, is_featured, proficiency_level);
CREATE INDEX idx_projects_user_featured ON projects (user_id, is_featured, is_published);
CREATE INDEX idx_projects_category_status ON projects (category_id, status, is_published);
CREATE INDEX idx_experience_user_dates ON experience (user_id, start_date DESC, end_date DESC);
CREATE INDEX idx_education_user_years ON education (user_id, start_year DESC, end_year DESC);

-- Create covering indexes for common SELECT operations
CREATE INDEX idx_portfolio_public_covering ON user_profiles (is_public, user_id) 
    INCLUDE (full_name, display_name, bio, profile_picture, portfolio_slug);

-- ===============================
-- 12. TRIGGERS FOR AUTOMATION
-- ===============================

DELIMITER //

-- Update project view count trigger
CREATE TRIGGER update_project_view_count 
AFTER INSERT ON project_views
FOR EACH ROW
BEGIN
    UPDATE projects 
    SET view_count = view_count + 1 
    WHERE id = NEW.project_id;
END//

-- Auto-generate portfolio slug trigger
CREATE TRIGGER generate_portfolio_slug
BEFORE INSERT ON user_profiles
FOR EACH ROW
BEGIN
    IF NEW.portfolio_slug IS NULL THEN
        SET NEW.portfolio_slug = LOWER(REPLACE(NEW.full_name, ' ', '-'));
    END IF;
END//

-- Auto-generate project slug trigger
CREATE TRIGGER generate_project_slug
BEFORE INSERT ON projects
FOR EACH ROW
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        SET NEW.slug = LOWER(REPLACE(REPLACE(NEW.title, ' ', '-'), '.', ''));
    END IF;
END//

DELIMITER ;

-- ===============================
-- 13. VIEWS FOR COMMON QUERIES
-- ===============================

-- Portfolio summary view
CREATE VIEW portfolio_summary AS
SELECT 
    up.user_id,
    up.full_name,
    up.display_name,
    up.portfolio_slug,
    up.profile_picture,
    up.bio,
    up.is_public,
    COUNT(DISTINCT p.id) as project_count,
    COUNT(DISTINCT us.id) as skill_count,
    COUNT(DISTINCT e.id) as experience_count,
    MAX(pv.viewed_at) as last_viewed
FROM user_profiles up
LEFT JOIN projects p ON up.user_id = p.user_id AND p.is_published = TRUE
LEFT JOIN user_skills us ON up.user_id = us.user_id
LEFT JOIN experience e ON up.user_id = e.user_id
LEFT JOIN portfolio_views pv ON up.user_id = pv.user_id
GROUP BY up.user_id;

-- Featured projects view
CREATE VIEW featured_projects AS
SELECT 
    p.*,
    up.full_name as owner_name,
    up.portfolio_slug,
    pc.name as category_name,
    pc.color as category_color
FROM projects p
JOIN user_profiles up ON p.user_id = up.user_id
LEFT JOIN project_categories pc ON p.category_id = pc.id
WHERE p.is_featured = TRUE AND p.is_published = TRUE AND up.is_public = TRUE
ORDER BY p.sort_order, p.created_at DESC;