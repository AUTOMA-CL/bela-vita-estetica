
-- Enable RLS
ALTER DATABASE postgres SET "app.settings.jwt_secret" TO 'super-secret-jwt-token-with-at-least-32-characters-long';

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL, -- Price in cents (Colombian pesos)
    duration INTEGER NOT NULL, -- Duration in minutes
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    client_name VARCHAR(200) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Faciales', 'Tratamientos faciales para rejuvenecer y cuidar tu piel'),
('Corporales', 'Tratamientos corporales para relajarte y renovarte'),
('Masajes', 'Masajes terapéuticos y relajantes')
ON CONFLICT DO NOTHING;

-- Insert sample services
INSERT INTO services (name, description, price, duration, category_id, image_url) VALUES
('Limpieza Facial Profunda', 'Tratamiento facial que incluye extracción de impurezas, exfoliación y mascarilla hidratante para una piel radiante.', 65000, 60, 1, NULL),
('Facial Anti-Edad', 'Tratamiento especializado con productos premium para reducir líneas de expresión y rejuvenecer la piel.', 85000, 90, 1, NULL),
('Hidrofacial', 'Tecnología avanzada que limpia, exfolia e hidrata profundamente para una piel luminosa al instante.', 95000, 75, 1, NULL),
('Masaje Relajante', 'Masaje de cuerpo completo con aceites aromáticos para liberar tensiones y alcanzar un estado de relajación total.', 70000, 60, 3, NULL),
('Masaje Descontracturante', 'Masaje terapéutico dirigido a aliviar contracturas musculares y tensiones específicas del cuerpo.', 80000, 75, 3, NULL),
('Exfoliación Corporal', 'Tratamiento completo de exfoliación e hidratación corporal que deja la piel suave y renovada.', 55000, 45, 2, NULL),
('Envoltura Corporal', 'Tratamiento detoxificante y reafirmante con arcillas y algas marinas para renovar completamente tu piel.', 90000, 90, 2, NULL),
('Masaje con Piedras Calientes', 'Relajante masaje con piedras volcánicas calientes que ayudan a liberar tensiones profundas.', 85000, 80, 3, NULL)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Services are viewable by everyone" ON services FOR SELECT USING (true);

-- Create policies for appointments (read/write access)
CREATE POLICY "Appointments are viewable by everyone" ON appointments FOR SELECT USING (true);
CREATE POLICY "Anyone can insert appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update appointments" ON appointments FOR UPDATE USING (true);
