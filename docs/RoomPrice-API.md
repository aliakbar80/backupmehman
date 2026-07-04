# مستندات API قیمت اتاق‌ها (Room Price Service)

## مقدمه
این سرویس برای مدیریت قیمت انواع اتاق‌ها در سیستم هتل استفاده می‌شود. با استفاده از این API می‌توانید قیمت‌های مختلف برای انواع اتاق‌ها (مثل اتاق یک خوابه، دو خوابه، سوئیت و...) تعریف و مدیریت کنید.

---

## Base URL
```
/v1/roomprice
```

---

## Endpoints

### 1. دریافت همه قیمت‌ها
**GET** `/v1/roomprice`

**توضیحات:** لیست تمام قیمت‌های تعریف شده را برمی‌گرداند.

**نمونه درخواست:**
```javascript
fetch('http://your-domain.com/v1/roomprice')
  .then(res => res.json())
  .then(data => console.log(data));
```

**نمونه پاسخ:**
```json
{
  "data": [
    {
      "_id": "645a1b2c3d4e5f6g7h8i9j0k",
      "roomType": "اتاق دو خوابه",
      "price": 30000000,
      "description": "اتاق با امکانات کامل",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "645a1b2c3d4e5f6g7h8i9j0l",
      "roomType": "اتاق یک خوابه",
      "price": 20000000,
      "description": "اتاق استاندارد",
      "createdAt": "2024-01-15T10:25:00.000Z",
      "updatedAt": "2024-01-15T10:25:00.000Z"
    }
  ]
}
```

---

### 2. دریافت یک قیمت با ID
**GET** `/v1/roomprice/:id`

**توضیحات:** اطلاعات یک قیمت خاص را با شناسه (ID) دریافت می‌کند.

**پارامترها:**
| پارامتر | نوع | توضیحات |
|---------|-----|---------|
| id | String | شناسه قیمت (در URL) |

**نمونه درخواست:**
```javascript
const id = "645a1b2c3d4e5f6g7h8i9j0k";
fetch(`http://your-domain.com/v1/roomprice/${id}`)
  .then(res => res.json())
  .then(data => console.log(data));
```

**نمونه پاسخ:**
```json
{
  "data": {
    "_id": "645a1b2c3d4e5f6g7h8i9j0k",
    "roomType": "اتاق دو خوابه",
    "price": 30000000,
    "description": "اتاق با امکانات کامل",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 3. ایجاد قیمت جدید
**POST** `/v1/roomprice`

**توضیحات:** یک قیمت جدید برای نوع اتاق تعریف می‌کند.

**Body (JSON):**
| فیلد | نوع | الزامی | توضیحات |
|------|-----|--------|---------|
| roomType | String | بله | نوع اتاق (مثال: "اتاق یک خوابه") |
| price | Number | بله | قیمت به تومان |
| description | String | خیر | توضیحات اضافی |

**نمونه درخواست:**
```javascript
const newRoomPrice = {
  roomType: "سوئیت لوکس",
  price: 50000000,
  description: "سوئیت با نمای دریا"
};

fetch('http://your-domain.com/v1/roomprice', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newRoomPrice)
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**نمونه پاسخ موفق:**
```json
{
  "msg": "قیمت با موفقیت ثبت شد",
  "data": {
    "_id": "645a1b2c3d4e5f6g7h8i9j0m",
    "roomType": "سوئیت لوکس",
    "price": 50000000,
    "description": "سوئیت با نمای دریا",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**نمونه پاسخ خطا (تکراری):**
```json
{
  "msg": "این نوع اتاق قبلاً ثبت شده است!"
}
```

---

### 4. بروزرسانی قیمت
**PUT** `/v1/roomprice/:id`

**توضیحات:** قیمت یک نوع اتاق را بروزرسانی می‌کند.

**پارامترها:**
| پارامتر | نوع | توضیحات |
|---------|-----|---------|
| id | String | شناسه قیمت (در URL) |

**Body (JSON):**
| فیلد | نوع | الزامی | توضیحات |
|------|-----|--------|---------|
| roomType | String | بله | نوع اتاق |
| price | Number | بله | قیمت جدید |
| description | String | خیر | توضیحات |

**نمونه درخواست:**
```javascript
const id = "645a1b2c3d4e5f6g7h8i9j0k";
const updatedData = {
  roomType: "اتاق دو خوابه",
  price: 35000000,
  description: "قیمت بروزرسانی شده"
};

fetch(`http://your-domain.com/v1/roomprice/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updatedData)
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**نمونه پاسخ:**
```json
{
  "msg": "قیمت با موفقیت بروزرسانی شد",
  "data": {
    "_id": "645a1b2c3d4e5f6g7h8i9j0k",
    "roomType": "اتاق دو خوابه",
    "price": 35000000,
    "description": "قیمت بروزرسانی شده",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:30:00.000Z"
  }
}
```

---

### 5. حذف قیمت
**DELETE** `/v1/roomprice/:id`

**توضیحات:** یک قیمت را حذف می‌کند.

**پارامترها:**
| پارامتر | نوع | توضیحات |
|---------|-----|---------|
| id | String | شناسه قیمت (در URL) |

**نمونه درخواست:**
```javascript
const id = "645a1b2c3d4e5f6g7h8i9j0k";

fetch(`http://your-domain.com/v1/roomprice/${id}`, {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**نمونه پاسخ:**
```json
{
  "msg": "قیمت با موفقیت حذف شد"
}
```

---

## کدهای وضعیت (Status Codes)

| کد | توضیحات |
|----|---------|
| 200 | موفقیت‌آمیز |
| 201 | ایجاد موفق |
| 400 | درخواست نامعتبر |
| 404 | یافت نشد |
| 422 | اطلاعات ناقص |
| 500 | خطای سرور |

---

## نمونه استفاده در React

```jsx
import { useState, useEffect } from 'react';

const RoomPriceList = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const res = await fetch('http://your-domain.com/v1/roomprice');
      const data = await res.json();
      setPrices(data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPrice = async (roomType, price, description) => {
    try {
      const res = await fetch('http://your-domain.com/v1/roomprice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomType, price, description })
      });
      const data = await res.json();
      if (res.ok) {
        fetchPrices(); // رفرش لیست
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div>در حال بارگذاری...</div>;

  return (
    <div>
      <h2>لیست قیمت اتاق‌ها</h2>
      <ul>
        {prices.map(item => (
          <li key={item._id}>
            {item.roomType}: {item.price.toLocaleString()} تومان
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomPriceList;
```

---

## نکات مهم

1. **تکراری نبودن:** نوع اتاق (roomType) باید یکتا باشد. اگر نوع اتاق تکراری ثبت شود، خطا دریافت می‌کنید.

2. **فرمت قیمت:** قیمت به صورت عدد (Number) و به تومان ارسال شود.

3. **نوع اتاق:** می‌توانید هر نامی برای نوع اتاق استفاده کنید، مثال‌ها:
   - "اتاق یک خوابه"
   - "اتاق دو خوابه"
   - "سوئیت"
   - "سوئیت لوکس"
   - "اتاق VIP"
   - "اتاق اقتصادی"

4. **ترتیب:** لیست قیمت‌ها به ترتیب جدیدترین اول برگردانده می‌شود.
