![5](https://github.com/user-attachments/assets/5761db59-a6a1-47b7-9024-9a84b9a2cd52)
![4](https://github.com/user-attachments/assets/f4300ac4-7508-4a10-81d6-4680faf12d1f)
![3](https://github.com/user-attachments/assets/a1c90dfe-f114-46d5-a4f9-1c016c3eab67)
![2](https://github.com/user-attachments/assets/bafbe0a9-cda4-487b-9c22-2a523a529929)
![1](https://github.com/user-attachments/assets/5b0f80be-59ad-450f-9fc7-7d12ebccb5e5)


# Digital E-Wallet 💸

A full-stack digital wallet application built to simulate the experience of managing funds, tracking expenses, and transferring money. Users can add money to their wallets from their bank accounts, view real-time wallet balances, access transaction history, and securely manage their funds. 

Deployed live on [Vercel](https://vercel.com/) for easy access and seamless performance.

## 🚀 Features

- **Add Funds**: Securely transfer funds from a bank account to the wallet.
- **Spend & Transfer**: Make payments and manage transfers directly from the wallet balance.
- **Balance Overview**: Instantly see current balance after every transaction.
- **Transaction History**: Detailed history of all transactions including date, amount, and type (credit/debit).
- **Authentication & Security**: Secure login and transactions with JWT.
- **Responsive UI**: Optimized for mobile and desktop, ensuring a smooth user experience.
- **Real-time Updates**: React and Next.js provide fast and dynamic updates on all interactions.

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) with [React](https://reactjs.org/)
- **Backend**: [Prisma](https://www.prisma.io/) ORM to manage database queries and schema
- **Database**: [PostgreSQL](https://www.postgresql.org/) for reliable and efficient data storage
- **Deployment**: Hosted on [Vercel](https://vercel.com/), allowing for seamless continuous integration and delivery


## 🔑 Key Features

- **Seamless Money Transfer**: Add or withdraw funds effortlessly from your account to your digital wallet.
- **Transaction Analytics**: Get detailed transaction records to keep track of expenses and deposits.
- **User Authentication**: Secure login to protect user data, powered by JWT.
- **Scalable & Modular Codebase**: Designed to accommodate new features and enhancements.
- **Optimized Performance**: Uses the power of Vercel for blazing-fast deployments and Prisma ORM for efficient database operations.

## ⚙️ Setup & Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/digital-e-wallet.git
    cd digital-e-wallet
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    Create a `.env` file and add the following variables:

    ```env
    DATABASE_URL=your_postgres_database_url
    JWT_SECRET=your_jwt_secret_key
    ```

4. **Run Database Migrations**

    ```bash
    npx prisma migrate dev
    ```

5. **Start the Application**

    ```bash
    npm run dev
    ```

6. **Deploy on Vercel**

    - For live deployment, connect the repository to Vercel, and ensure the environment variables are set up in Vercel’s dashboard.

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).

## 🙏 Acknowledgments

- Thanks to [Prisma](https://www.prisma.io/) and [Next.js](https://nextjs.org/) for providing great tools for web development.
- Inspiration for digital wallet management.

