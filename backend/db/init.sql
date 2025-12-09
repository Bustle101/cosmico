CREATE TABLE IF NOT EXISTS cms_blocks (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS iss_telemetry (
    timestamp TIMESTAMPTZ PRIMARY KEY,
    lat DOUBLE PRECISION,
    lon DOUBLE PRECISION,
    altitude DOUBLE PRECISION,
    velocity DOUBLE PRECISION
);

CREATE TABLE IF NOT EXISTS api_cache (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS fetch_log (
    id SERIAL PRIMARY KEY,
    service TEXT NOT NULL,              
    endpoint TEXT NOT NULL,              
    status TEXT NOT NULL,              
    http_code INT,
    duration_ms INT NOT NULL,           
    payload_bytes INT,                   
    error_code TEXT,                    
    error_message TEXT,                  
    fetched_at TIMESTAMPTZ DEFAULT now() 
);
