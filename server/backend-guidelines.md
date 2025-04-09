# Backend Code Guidelines (Laravel)

## 📁 File & Folder Naming

-   Use **PascalCase** for models (e.g., `User`, `HistoryLog`)
-   Use **camelCase** for methods and variables (e.g., `getUserLogs`, `userEmail`)
-   Use **snake_case** for database column names (e.g., `user_id`, `created_at`)
-   Migrations: use descriptive names (e.g., `create_history_logs_table`)

---

## 🧩 Controller Structure

-   One controller per resource (e.g., `UserController`, `ImageController`)
-   Follow RESTful naming conventions:
    -   `index()`, `store()`, `show()`, `update()`, `destroy()`
-   Keep controller methods clean — delegate logic to services where possible

---

## 🛣️ Routes

-   Use `routes/api.php` for APIs
-   Follow RESTful route patterns: `/api/login`, `/api/images`, `/api/users/{id}`

---

## ✅ Validation

-   Use **Form Request classes** (`php artisan make:request`) for validation
-   Store them in `App\Http\Requests\`
-   Keep validation rules out of controllers for cleanliness and reusability

---

## 📦 API Responses

-   Keep a consistent JSON response format across all endpoints:

```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": { ... }
}
```

## 🧬 Database & Migrations

-   Define relationships in models (`hasMany`, `belongsTo`, `hasOne`, etc.)
-   Create **foreign keys** in migration files for proper database integrity
-   Use **seeder files** to populate default data or sample records
-   Store all migration files inside `database/migrations`

---

## 🛠️ Services & Helpers

-   Extract business logic to **Service classes**  
    _(e.g., `ImageProcessorService`, `GeoLocationService`)_
-   Use folders like `App\Services` or `App\Helpers` for reusable logic
-   Keeps controllers clean, focused, and easier to maintain

---

## 🔐 Security & Auth

-   Store sensitive configuration keys in `.env` and never hardcode secrets
-   Always sanitize and validate **user input** (prefer Form Requests)

---

## 🗂️ Suggested Folder Structure

```bash
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   ├── Requests/
│   ├── Models/
│   ├── Services/
│   ├── Traits/
├── config/
├── database/
│   ├── migrations/
│   ├── seeders/
├── routes/
│   ├── api.php
│   ├── web.php
├── storage/
├── tests/
├── composer.json
```
