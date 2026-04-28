<template>
  <div class="page">
    <div class="container">

      <div class="header">
        <h1>О проекте</h1>
        <p>Веб-приложение оценки фильмов на Vue 3</p>
      </div>

      <div class="card">
        <h2>Описание проекта</h2>

        <p class="text">
          Это полнофункциональная платформа для оценки фильмов, где пользователи могут
          регистрироваться, просматривать каталог фильмов, оставлять оценки и комментарии,
          а также управлять своими списками. Также есть админ-панель для управления контентом.
        </p>

        <h3>Основные возможности</h3>

        <ul class="list">
          <li>Регистрация и авторизация пользователей</li>
          <li>Роли доступа (пользователь / администратор)</li>
          <li>Каталог фильмов с подробными страницами</li>
          <li>Система рейтингов и отзывов</li>
          <li>Админ-панель с CRUD-операциями</li>
          <li>Хранение данных в LocalStorage</li>
          <li>Защищённые маршруты (router guards)</li>
        </ul>
      </div>

      <div class="grid">
        <div class="box">
          <h3>Технологии</h3>
          <ul>
            <li>Vue 3 (Composition API)</li>
            <li>Vite</li>
            <li>Vue Router</li>
            <li>Composables архитектура</li>
            <li>LocalStorage API</li>
          </ul>
        </div>

        <div class="box">
          <h3>Архитектура</h3>
          <ul>
            <li>Разделение логики через composables</li>
            <li>Сервисный слой хранения данных</li>
            <li>Ролевая система доступа</li>
            <li>Переиспользуемые компоненты</li>
          </ul>
        </div>
      </div>

      <div class="footer">
        Учебный проект Vue 3 приложения для оценки фильмов
      </div>

    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #0b0b0b;
  color: #f5f5f5;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
}

.container {
  max-width: 900px;
  width: 100%;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 38px;
  font-weight: 800;
  color: #ffcc00;
  letter-spacing: 1px;
}

.header p {
  color: #b0b0b0;
  margin-top: 8px;
}

.card {
  background: #141414;
  border: 1px solid #ff0000;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.15);
}

.card h2 {
  color: #ffcc00;
  margin-bottom: 12px;
}

.card h3 {
  margin-top: 20px;
  margin-bottom: 10px;
  color: #ff4444;
}

.text {
  color: #e5e5e5;
  line-height: 1.6;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list li {
  padding: 6px 0;
  position: relative;
  padding-left: 18px;
  color: #e5e5e5;
}

.list li::before {
  content: "●";
  position: absolute;
  left: 0;
  color: #ffcc00;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.box {
  background: #111;
  border: 1px solid #ff0000;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.1);
}

.box h3 {
  color: #ffcc00;
  margin-bottom: 10px;
}

.box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.box li {
  font-size: 14px;
  color: #d0d0d0;
  padding: 4px 0;
}

.footer {
  text-align: center;
  margin-top: 30px;
  color: #888;
  font-size: 13px;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 30px;
  }
}
</style>