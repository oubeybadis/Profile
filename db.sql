-- 1. Tenant isolation
CREATE TABLE tenants (
    id          SERIAL PRIMARY KEY,
    slug        CITEXT UNIQUE,          -- mycompany.yourportfolio.app
    plan        TEXT CHECK (plan IN ('free','pro','enterprise')),
    created_at  TIMESTAMPTZ DEFAULT now()
);

-- 2. Owner account that can log into the admin panel
CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    tenant_id   INT REFERENCES tenants(id) ON DELETE CASCADE,
    email       CITEXT UNIQUE,
    password_hash TEXT,
    role        TEXT CHECK (role IN ('owner','editor')),
    created_at  TIMESTAMPTZ DEFAULT now()
);

-- 3. Global lookup table for skills / keywords (normalised)
CREATE TABLE skill_dictionary (
    id          SERIAL PRIMARY KEY,
    name        CITEXT UNIQUE,
    category    TEXT
);

-- 4. Main profile (one per tenant)
CREATE TABLE profiles (
    tenant_id   INT PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
    full_name   TEXT,
    tagline     TEXT,
    bio         TEXT,
    location    TEXT,
    social_links JSONB,                 -- {github: "...", linkedin: "..."}
    theme       TEXT DEFAULT 'light',
    hero_image  TEXT                    -- URL
);

-- 5. CV PDF (optional)
CREATE TABLE cv_pdfs (
    tenant_id   INT PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
    filename    TEXT,
    file_size   INT,
    uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Languages (normalised many-to-many)
CREATE TABLE profile_languages (
    tenant_id   INT REFERENCES tenants(id) ON DELETE CASCADE,
    code        TEXT,                   -- ISO-639-1
    level       TEXT CHECK (level IN ('native','fluent','conversational','basic')),
    PRIMARY KEY (tenant_id, code)
);

-- 7. Skills as tags (many-to-many)
CREATE TABLE profile_skills (
    tenant_id   INT REFERENCES tenants(id) ON DELETE CASCADE,
    skill_id    INT REFERENCES skill_dictionary(id),
    level       SMALLINT CHECK (level BETWEEN 0 AND 5),
    PRIMARY KEY (tenant_id, skill_id)
);

-- 8. Projects
CREATE TABLE projects (
    id          SERIAL PRIMARY KEY,
    tenant_id   INT REFERENCES tenants(id) ON DELETE CASCADE,
    title       TEXT,
    brief_desc  TEXT,
    long_desc   TEXT,
    key_words   TEXT[],                -- PostgreSQL array for fast GIN search
    tech_stack  TEXT[],
    main_image  TEXT,
    other_images TEXT[],
    url_demo    TEXT,
    url_code    TEXT,
    created_at  TIMESTAMPTZ DEFAULT now()
);

-- 9. Education
CREATE TABLE education (
    id          SERIAL PRIMARY KEY,
    tenant_id   INT REFERENCES tenants(id) ON DELETE CASCADE,
    degree      TEXT,
    field       TEXT,
    university  TEXT,
    start_year  SMALLINT,
    end_year    SMALLINT,
    description TEXT
);

-- 10. Experience
CREATE TABLE experience (
    id          SERIAL PRIMARY KEY,
    tenant_id   INT REFERENCES tenants(id) ON DELETE CASCADE,
    job_name    TEXT,
    company     TEXT,
    start_year  SMALLINT,
    end_year    SMALLINT,
    description TEXT
);