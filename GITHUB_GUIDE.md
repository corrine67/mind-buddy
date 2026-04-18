# Mind Buddy - GitHub Publishing Guide

## Step-by-Step GitHub Setup & Publishing

### **Part 1: Create a GitHub Repository**

#### 1.1 Create Repository on GitHub
1. Go to [github.com/new](https://github.com/new)
2. Fill in the details:
   - **Repository name**: `mind-buddy`
   - **Description**: "AI-powered youth wellbeing companion with mood tracking, crisis support, and community connection"
   - **Visibility**: Select **Public** (so others can see your project)
   - **Initialize with README**: Leave unchecked (we already have one)
3. Click **Create repository**

#### 1.2 Copy Repository URL
After creation, you'll see a page with your repository URL. Copy the HTTPS URL (looks like `https://github.com/YOUR_USERNAME/mind-buddy.git`)

---

### **Part 2: Push Code to GitHub (Using Manus Management UI)**

The easiest way is to use the **Manus Management UI** built-in GitHub export:

1. **Open the Management UI** (click the panel icon in the top-right of the Manus interface)
2. **Go to Settings** → **GitHub**
3. **Connect your GitHub account** if not already connected
4. **Select repository owner** and enter `mind-buddy` as the repository name
5. **Click "Export to GitHub"**
6. Manus will automatically push all your code to GitHub

---

### **Part 3: Manual GitHub Setup (If Needed)**

If you prefer to push manually or want more control:

#### 3.1 Initialize Git (if not already done)
```bash
cd /home/ubuntu/mind-buddy
git init
git add .
git commit -m "Initial commit: Mind Buddy MVP with UI, database schema, and core features"
```

#### 3.2 Add Remote Repository
```bash
git remote add origin https://github.com/YOUR_USERNAME/mind-buddy.git
```

#### 3.3 Push to GitHub
```bash
git branch -M main
git push -u origin main
```

---

### **Part 4: Create a Comprehensive README**

Your GitHub repository needs a professional README. Here's a template:

```markdown
# Mind Buddy 🧠💜

An AI-powered mental wellness companion designed specifically for youth. Mind Buddy provides emotional support, mood tracking, crisis intervention, and community connection in a beautiful, mobile-first interface.

## Features

### Core Features
- **AI Chat Companion**: Empathetic AI that listens and provides coping strategies
- **Emotion Check-in**: Daily mood tracking with emoji selectors and trend analysis
- **Crisis Alert System**: Automatic distress detection with emergency resources
- **Trusted Circle**: Alert trusted contacts during mental health crises
- **Habit Builder**: Daily wellness micro-habits with streak tracking
- **Community Support**: Anonymous peer support feed with reactions
- **Wellness Dashboard**: AI-generated insights and burnout prediction
- **Weekly Reports**: Personalized mental health summaries

### Design
- Premium dark-purple-to-teal gradient theme
- Mobile-first responsive design (max-w-sm centered)
- Bottom navigation for easy access
- Smooth page transitions and animations

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4
- **Backend**: Express.js, tRPC 11
- **Database**: MySQL with Drizzle ORM
- **Authentication**: Manus OAuth
- **AI Integration**: LLM-powered chat and insights
- **Data Visualization**: Recharts
- **UI Components**: Shadcn/ui

## Getting Started

### Prerequisites
- Node.js 22+
- pnpm package manager
- MySQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/mind-buddy.git
cd mind-buddy
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Create .env file with your configuration
DATABASE_URL=mysql://user:password@localhost:3306/mind_buddy
JWT_SECRET=your_secret_key
VITE_APP_ID=your_manus_app_id
```

4. Run database migrations:
```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

5. Start development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
mind-buddy/
├── client/
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable UI components
│   │   ├── App.tsx          # Main app with routing
│   │   └── index.css        # Global theme styles
│   └── index.html
├── server/
│   ├── routers.ts           # tRPC procedures
│   ├── db.ts                # Database queries
│   └── _core/               # Framework internals
├── drizzle/
│   ├── schema.ts            # Database schema
│   └── migrations/          # SQL migrations
└── package.json
```

## Database Schema

- **users**: User accounts and authentication
- **moods**: Daily mood check-ins
- **chatMessages**: AI chat conversation history
- **habits**: Wellness habit tracking
- **habitCompletions**: Daily habit completion logs
- **trustedContacts**: Emergency contacts
- **communityPosts**: Anonymous peer support posts
- **communityReplies**: Replies to community posts
- **notifications**: In-app and email notifications
- **sosEvents**: Crisis alert events
- **weeklyReports**: AI-generated weekly summaries
- **supportResources**: Local mental health resources

## API Endpoints (tRPC)

All API calls use tRPC procedures. Examples:

```typescript
// Authentication
trpc.auth.me.useQuery()
trpc.auth.logout.useMutation()

// Mood tracking
trpc.mood.saveMood.useMutation()
trpc.mood.getUserMoods.useQuery()

// Chat
trpc.chat.sendMessage.useMutation()
trpc.chat.getHistory.useQuery()

// Community
trpc.community.createPost.useMutation()
trpc.community.getPosts.useQuery()
```

## Crisis Resources

If you or someone you know is in crisis:
- **National Suicide Prevention Lifeline**: 988 (US)
- **Crisis Text Line**: Text HOME to 741741
- **International Association for Suicide Prevention**: https://www.iasp.info/resources/Crisis_Centres/

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

Run tests with:
```bash
pnpm test
```

## Deployment

### Deploy to Manus (Recommended)
1. Click **Publish** in the Manus Management UI
2. Your app will be deployed to `your-app.manus.space`

### Deploy to Other Platforms
- **Vercel**: Recommended for frontend, connect your GitHub repo
- **Railway**: Full-stack deployment with database
- **Render**: Similar to Railway, good free tier
- **DigitalOcean**: VPS option for full control

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or feedback:
- Open an issue on GitHub
- Contact: support@mindbuddy.app

## Acknowledgments

- Built with React, TypeScript, and Tailwind CSS
- Powered by Manus platform
- Inspired by mental health advocacy and youth wellness initiatives

---

**Remember**: Mind Buddy is a support tool, not a replacement for professional mental health care. Always seek professional help if you're in crisis.
```

---

### **Part 5: Add Important Files**

#### 5.1 Create `.gitignore`
```
node_modules/
dist/
.env
.env.local
.DS_Store
*.log
.vite/
```

#### 5.2 Create `LICENSE` (MIT)
```
MIT License

Copyright (c) 2026 Mind Buddy Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

### **Part 6: Publish & Share**

Once your code is on GitHub:

1. **Add topics** to your repository:
   - Go to repository settings
   - Add topics: `mental-health`, `wellness`, `ai`, `youth`, `react`, `typescript`

2. **Add a GitHub Pages site** (optional):
   - Go to Settings → Pages
   - Select main branch as source
   - Your README will be displayed

3. **Share your project**:
   - Share the GitHub URL with friends, mentors, and the hackathon organizers
   - Include the Manus live demo link: `https://3000-i9d9ahkq0rvmqop7et2j6-0e976f60.sg1.manus.computer`

---

## GitHub Best Practices

### Commit Messages
Use clear, descriptive commit messages:
```
git commit -m "feat: Add AI chat companion with emotion detection"
git commit -m "fix: Resolve mood tracking persistence issue"
git commit -m "docs: Update README with setup instructions"
```

### Branches
For larger features, create branches:
```bash
git checkout -b feature/trusted-circle
# Make changes
git push origin feature/trusted-circle
# Create Pull Request on GitHub
```

### Issues & Discussions
- Use **Issues** to track bugs and feature requests
- Use **Discussions** for questions and community feedback

---

## Deployment Checklist

Before publishing to production:

- [ ] All features tested in development
- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] README and documentation complete
- [ ] License file added
- [ ] .gitignore configured
- [ ] Code pushed to GitHub
- [ ] GitHub repository is public
- [ ] Topics and description added
- [ ] Live demo link working

---

## Next Steps

1. **Publish to GitHub** using the steps above
2. **Deploy the app** using Manus or another platform
3. **Share with your network** and get feedback
4. **Iterate and improve** based on user feedback
5. **Consider monetization** or sustainability options

---

## Support & Resources

- **Manus Documentation**: https://docs.manus.im
- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **tRPC**: https://trpc.io
- **Drizzle ORM**: https://orm.drizzle.team

---

**Good luck with Mind Buddy! Your project has the potential to make a real difference in youth mental health. 🌟**
