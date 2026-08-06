from database import SessionLocal, engine, Base
import models

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if db.query(models.Category).first() is None:
            print("🌱 Seeding database with starting categories...")
            categories = [
                models.Category(name="Food & Dining", budget_limit=500.00),
                models.Category(name="Rent & Utilities", budget_limit=1500.00),
                models.Category(name="Entertainment", budget_limit=200.00),
                models.Category(name="Transport", budget_limit=150.00)
            ]
            db.add_all(categories)
            default_user = models.User(username="testuser", email="user@example.com")
            db.add(default_user)
            db.commit()
            print("✅ Database seeding complete.")
        else:
            print("⏩ Database already seeded. Skipping execution.")
    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
