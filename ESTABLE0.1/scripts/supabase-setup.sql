-- =====================================================
-- BELA VITA - ESQUEMA COMPLETO DE BASE DE DATOS
-- Versión: 1.0 - Julio 2025
-- =====================================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- ENUMS (TIPOS PERSONALIZADOS)
-- =====================================================

CREATE TYPE user_role AS ENUM ('CLIENT', 'ADMIN');
CREATE TYPE appointment_status AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW');
CREATE TYPE payment_status AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIAL_REFUND');
CREATE TYPE payment_method AS ENUM ('WEBPAY', 'CASH', 'TRANSFER');
CREATE TYPE custom_field_type AS ENUM ('TEXT', 'EMAIL', 'PHONE', 'NUMBER', 'TEXTAREA', 'SELECT', 'RADIO', 'CHECKBOX', 'DATE');

-- =====================================================
-- TABLAS PRINCIPALES
-- =====================================================

-- Tabla de usuarios
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR NOT NULL UNIQUE,
    name VARCHAR,
    phone VARCHAR,
    role user_role DEFAULT 'CLIENT',
    password VARCHAR,
    email_verified TIMESTAMP,
    image TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de cuentas OAuth
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR NOT NULL,
    provider VARCHAR NOT NULL,
    provider_account_id VARCHAR NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type VARCHAR,
    scope VARCHAR,
    id_token TEXT,
    session_state VARCHAR
);

-- Tabla de sesiones
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_token VARCHAR NOT NULL UNIQUE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires TIMESTAMP NOT NULL
);

-- Tabla de tokens de verificación
CREATE TABLE verification_tokens (
    identifier VARCHAR NOT NULL,
    token VARCHAR NOT NULL,
    expires TIMESTAMP NOT NULL,
    PRIMARY KEY (identifier, token)
);

-- Tabla de categorías
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    description TEXT,
    color VARCHAR DEFAULT '#E91E63',
    icon VARCHAR,
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de servicios
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    description TEXT,
    short_description TEXT,
    price NUMERIC NOT NULL,
    duration INTEGER NOT NULL,
    category_id UUID NOT NULL REFERENCES categories(id),
    image TEXT,
    active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    home_service BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de servicios destacados
CREATE TABLE featured_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL UNIQUE REFERENCES services(id),
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de sucursales
CREATE TABLE branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR,
    email VARCHAR,
    latitude NUMERIC,
    longitude NUMERIC,
    active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de citas
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    service_id UUID NOT NULL REFERENCES services(id),
    branch_id UUID NOT NULL REFERENCES branches(id),
    date DATE NOT NULL,
    time TIME NOT NULL,
    status appointment_status DEFAULT 'PENDING',
    notes TEXT,
    client_name VARCHAR NOT NULL,
    client_email VARCHAR NOT NULL,
    client_phone VARCHAR NOT NULL,
    client_address TEXT,
    is_home_service BOOLEAN DEFAULT false,
    total_amount NUMERIC NOT NULL,
    payment_status payment_status DEFAULT 'PENDING',
    payment_id UUID,
    access_code VARCHAR UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de pagos
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID NOT NULL UNIQUE REFERENCES appointments(id),
    amount NUMERIC NOT NULL,
    status payment_status DEFAULT 'PENDING',
    method payment_method DEFAULT 'WEBPAY',
    transaction_id VARCHAR,
    webpay_token VARCHAR,
    webpay_response JSONB,
    refund_amount NUMERIC,
    refund_reason TEXT,
    refunded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de campos personalizados
CREATE TABLE custom_fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    label VARCHAR NOT NULL,
    type custom_field_type NOT NULL,
    required BOOLEAN DEFAULT false,
    options JSONB,
    placeholder VARCHAR,
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de valores de campos personalizados por cita
CREATE TABLE appointment_custom_fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID NOT NULL REFERENCES appointments(id),
    custom_field_id UUID NOT NULL REFERENCES custom_fields(id),
    value TEXT
);

-- Tabla de fechas bloqueadas
CREATE TABLE blocked_date_ranges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de horarios bloqueados
CREATE TABLE blocked_time_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    reason TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de tarifas por comuna
CREATE TABLE commune_fees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    commune VARCHAR NOT NULL UNIQUE,
    fee NUMERIC NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de configuración del sitio
CREATE TABLE site_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_name VARCHAR DEFAULT 'Bela Vita',
    site_description TEXT,
    primary_color VARCHAR DEFAULT '#E91E63',
    accent_color VARCHAR DEFAULT '#F8BBD9',
    logo_url TEXT,
    hero_title TEXT,
    hero_subtitle TEXT,
    hero_image TEXT,
    contact_email VARCHAR,
    contact_phone VARCHAR,
    contact_address TEXT,
    social_instagram VARCHAR,
    social_facebook VARCHAR,
    social_whatsapp VARCHAR,
    business_hours JSONB,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de configuración del negocio
CREATE TABLE business_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_name VARCHAR DEFAULT 'Bela Vita',
    business_email VARCHAR,
    business_phone VARCHAR,
    business_address TEXT,
    appointment_duration INTEGER DEFAULT 60,
    working_hours JSONB,
    time_slot_interval INTEGER DEFAULT 30,
    advance_booking_days INTEGER DEFAULT 30,
    cancellation_hours INTEGER DEFAULT 24,
    require_payment BOOLEAN DEFAULT false,
    payment_percentage INTEGER DEFAULT 50,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de configuración de servicios a domicilio
CREATE TABLE home_service_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enabled BOOLEAN DEFAULT false,
    base_fee NUMERIC DEFAULT 0,
    fee_per_km NUMERIC DEFAULT 0,
    max_distance INTEGER DEFAULT 20,
    min_order_amount NUMERIC DEFAULT 0,
    available_communes JSONB,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_service_id ON appointments(service_id);
CREATE INDEX idx_appointments_branch_id ON appointments(branch_id);
CREATE INDEX idx_appointments_access_code ON appointments(access_code);

CREATE INDEX idx_services_category_id ON services(category_id);
CREATE INDEX idx_services_featured ON services(featured);
CREATE INDEX idx_services_active ON services(active);

CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_appointment_id ON payments(appointment_id);
CREATE INDEX idx_payments_webpay_token ON payments(webpay_token);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

CREATE INDEX idx_categories_active ON categories(active);
CREATE INDEX idx_categories_order ON categories(order_index);

-- =====================================================
-- FUNCIONES Y TRIGGERS
-- =====================================================

-- Función para actualizar el campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_branches_updated_at BEFORE UPDATE ON branches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_custom_fields_updated_at BEFORE UPDATE ON custom_fields FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_commune_fees_updated_at BEFORE UPDATE ON commune_fees FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_config_updated_at BEFORE UPDATE ON site_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_business_config_updated_at BEFORE UPDATE ON business_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_home_service_config_updated_at BEFORE UPDATE ON home_service_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para generar código de acceso único
CREATE OR REPLACE FUNCTION generate_access_code()
RETURNS TEXT AS $$
DECLARE
    code TEXT;
    exists_code BOOLEAN;
BEGIN
    LOOP
        code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
        SELECT EXISTS(SELECT 1 FROM appointments WHERE access_code = code) INTO exists_code;
        IF NOT exists_code THEN
            EXIT;
        END IF;
    END LOOP;
    RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Trigger para generar código de acceso automáticamente
CREATE OR REPLACE FUNCTION set_access_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.access_code IS NULL THEN
        NEW.access_code := generate_access_code();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_appointment_access_code
    BEFORE INSERT ON appointments
    FOR EACH ROW
    EXECUTE FUNCTION set_access_code();

-- =====================================================
-- VISTAS ÚTILES
-- =====================================================

-- Vista de citas con información completa
CREATE OR REPLACE VIEW appointment_details AS
SELECT 
    a.*,
    s.name as service_name,
    s.price as service_price,
    s.duration as service_duration,
    c.name as category_name,
    c.color as category_color,
    b.name as branch_name,
    b.address as branch_address,
    u.name as user_name,
    u.email as user_email
FROM appointments a
JOIN services s ON a.service_id = s.id
JOIN categories c ON s.category_id = c.id
JOIN branches b ON a.branch_id = b.id
LEFT JOIN users u ON a.user_id = u.id;

-- Vista de estadísticas del dashboard
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM appointments WHERE date = CURRENT_DATE) as today_appointments,
    (SELECT COUNT(*) FROM appointments WHERE date >= DATE_TRUNC('month', CURRENT_DATE)) as month_appointments,
    (SELECT SUM(total_amount) FROM appointments WHERE date >= DATE_TRUNC('month', CURRENT_DATE) AND status = 'COMPLETED') as month_revenue,
    (SELECT COUNT(DISTINCT user_id) FROM appointments WHERE user_id IS NOT NULL) as total_clients,
    (SELECT COUNT(*) FROM services WHERE active = true) as active_services;

-- =====================================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- =====================================================

-- Habilitar RLS en todas las tablas principales
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Políticas para servicios (lectura pública)
CREATE POLICY "Services are viewable by everyone" ON services FOR SELECT USING (active = true);
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (active = true);

-- Políticas para citas
CREATE POLICY "Users can view own appointments" ON appointments FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.jwt() ->> 'role' = 'ADMIN'
);

CREATE POLICY "Users can create appointments" ON appointments FOR INSERT WITH CHECK (
    auth.uid() = user_id OR 
    auth.jwt() ->> 'role' = 'ADMIN' OR
    user_id IS NULL -- Para citas sin usuario registrado
);

CREATE POLICY "Users can update own appointments" ON appointments FOR UPDATE USING (
    auth.uid() = user_id OR 
    auth.jwt() ->> 'role' = 'ADMIN'
);

-- Políticas para pagos
CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM appointments 
        WHERE appointments.id = payments.appointment_id 
        AND (appointments.user_id = auth.uid() OR auth.jwt() ->> 'role' = 'ADMIN')
    )
);

-- Políticas para administradores (acceso completo)
CREATE POLICY "Admins have full access" ON users FOR ALL USING (auth.jwt() ->> 'role' = 'ADMIN');
CREATE POLICY "Admins have full access to appointments" ON appointments FOR ALL USING (auth.jwt() ->> 'role' = 'ADMIN');
CREATE POLICY "Admins have full access to payments" ON payments FOR ALL USING (auth.jwt() ->> 'role' = 'ADMIN');
CREATE POLICY "Admins have full access to services" ON services FOR ALL USING (auth.jwt() ->> 'role' = 'ADMIN');
CREATE POLICY "Admins have full access to categories" ON categories FOR ALL USING (auth.jwt() ->> 'role' = 'ADMIN');

-- =====================================================
-- DATOS INICIALES (SEED DATA)
-- =====================================================

-- Configuración inicial del negocio
INSERT INTO business_config (
    business_name,
    business_email,
    business_phone,
    business_address,
    working_hours,
    appointment_duration,
    time_slot_interval,
    advance_booking_days,
    cancellation_hours
) VALUES (
    'Bela Vita',
    'contacto@belavita.cl',
    '+56912345678',
    'Av. Providencia 1234, Providencia, Santiago',
    '{
        "monday": {"start": "09:00", "end": "18:00"},
        "tuesday": {"start": "09:00", "end": "18:00"},
        "wednesday": {"start": "09:00", "end": "18:00"},
        "thursday": {"start": "09:00", "end": "18:00"},
        "friday": {"start": "09:00", "end": "18:00"},
        "saturday": {"start": "10:00", "end": "16:00"},
        "sunday": {"closed": true}
    }',
    60,
    30,
    30,
    24
);

-- Configuración del sitio
INSERT INTO site_config (
    site_name,
    site_description,
    hero_title,
    hero_subtitle,
    contact_email,
    contact_phone,
    social_whatsapp
) VALUES (
    'Bela Vita',
    'Centro de estética y belleza especializado en tratamientos faciales y corporales',
    'Tu belleza natural, realzada',
    'Descubre nuestros tratamientos de estética avanzada y vive una experiencia única de relajación y bienestar',
    'contacto@belavita.cl',
    '+56912345678',
    '+56912345678'
);

-- Sucursal principal
INSERT INTO branches (name, address, phone, email, active) VALUES (
    'Bela Vita - Providencia',
    'Av. Providencia 1234, Providencia, Santiago',
    '+56912345678',
    'providencia@belavita.cl',
    true
);

-- Categorías de servicios
INSERT INTO categories (name, description, color, order_index) VALUES 
('Tratamientos Faciales', 'Cuidado y rejuvenecimiento facial', '#E91E63', 1),
('Tratamientos Corporales', 'Relajación y bienestar corporal', '#9C27B0', 2),
('Depilación', 'Depilación láser y tradicional', '#2196F3', 3),
('Masajes', 'Masajes terapéuticos y relajantes', '#4CAF50', 4),
('Manicure y Pedicure', 'Cuidado de manos y pies', '#FF9800', 5);

-- Servicios de ejemplo
WITH category_ids AS (
    SELECT id, name FROM categories
)
INSERT INTO services (name, description, short_description, price, duration, category_id, featured, home_service) 
SELECT 
    service_name,
    service_description,
    service_short,
    service_price,
    service_duration,
    c.id,
    service_featured,
    service_home
FROM (
    VALUES 
    ('Limpieza Facial Profunda', 'Tratamiento completo de limpieza facial con extracción de comedones y mascarilla hidratante', 'Limpieza profunda + hidratación', 45000, 90, 'Tratamientos Faciales', true, false),
    ('Radiofrecuencia Facial', 'Tratamiento anti-edad con tecnología de radiofrecuencia para reafirmar la piel', 'Anti-edad con radiofrecuencia', 65000, 60, 'Tratamientos Faciales', true, false),
    ('Masaje Relajante', 'Masaje corporal completo con aceites esenciales para relajación profunda', 'Masaje corporal relajante', 55000, 75, 'Masajes', true, true),
    ('Depilación Láser Piernas', 'Depilación láser definitiva para piernas completas', 'Depilación láser piernas', 80000, 45, 'Depilación', false, false),
    ('Manicure Spa', 'Manicure completa con tratamiento hidratante y esmaltado', 'Manicure + hidratación', 25000, 45, 'Manicure y Pedicure', false, true),
    ('Tratamiento Corporal Reductivo', 'Tratamiento corporal para reducción de medidas con tecnología avanzada', 'Reductivo corporal', 75000, 90, 'Tratamientos Corporales', true, false)
) AS services_data(service_name, service_description, service_short, service_price, service_duration, category_name, service_featured, service_home)
JOIN category_ids c ON c.name = services_data.category_name;

-- Configuración de servicios a domicilio
INSERT INTO home_service_config (
    enabled,
    base_fee,
    fee_per_km,
    max_distance,
    min_order_amount,
    available_communes
) VALUES (
    true,
    15000,
    2000,
    25,
    50000,
    '["Providencia", "Las Condes", "Vitacura", "Ñuñoa", "Santiago Centro", "La Reina"]'
);

-- Campos personalizados de ejemplo
INSERT INTO custom_fields (name, label, type, required, order_index) VALUES 
('emergency_contact', 'Contacto de emergencia', 'PHONE', false, 1),
('allergies', '¿Tienes alguna alergia?', 'TEXTAREA', false, 2),
('previous_treatments', '¿Has recibido tratamientos similares antes?', 'RADIO', false, 3),
('skin_type', 'Tipo de piel', 'SELECT', false, 4);

-- Opciones para campos personalizados
UPDATE custom_fields SET options = '["Sí", "No"]' WHERE name = 'previous_treatments';
UPDATE custom_fields SET options = '["Grasa", "Seca", "Mixta", "Sensible", "Normal"]' WHERE name = 'skin_type';

-- =====================================================
-- FIN DEL ESQUEMA
-- =====================================================