import psycopg2

try:
    conn = psycopg2.connect(
        host="db.jghkpqqxpfeqqiefjccj.supabase.co",
        dbname="postgres",
        user="postgres",
        password="ŞİFRENİ_BURAYA_YAZ",
        sslmode="require"
    )
    print("✅ Bağlantı başarılı!")
except Exception as e:
    print("❌ Hata:", e)
