# Backend
cd server
cp .env.example .env     # or create .env manually
# edit .env -> DATABASE_URL, JWT_SECRET, PORT=5175
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run dev              # API at http://localhost:5175

# Frontend (in a new terminal)
cd frontend
echo 'VITE_API_URL="http://localhost:5175/api"' > .env
npm install
npm run dev       