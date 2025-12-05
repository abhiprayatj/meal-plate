# Vercel Deployment Guide

Follow these steps to deploy your MealPlate Pretotype to Vercel.

## Prerequisites

1. **GitHub/GitLab/Bitbucket Account**: Your code should be in a Git repository
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free tier is sufficient)
3. **Supabase Project**: Make sure your Supabase database is set up with the schema from `supabase-schema.sql`

## Step-by-Step Deployment

### Step 1: Push Your Code to Git

Make sure all your code is committed and pushed to your Git repository:

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push
```

### Step 2: Sign Up/Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (or **"Login"** if you already have an account)
3. Choose to sign up with your Git provider (GitHub, GitLab, or Bitbucket) - this makes deployment easier

### Step 3: Import Your Project

1. Once logged in, click **"Add New..."** → **"Project"**
2. Import your repository from your Git provider
3. Vercel will automatically detect it's a Next.js project

### Step 4: Configure Project Settings

Vercel should auto-detect:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (or `next build`)
- **Output Directory**: `.next`
- **Install Command**: `npm install`

You can leave these as default. Click **"Deploy"** (we'll configure environment variables next).

### Step 5: Configure Environment Variables

Before the first deployment completes, or right after:

1. In your Vercel project dashboard, go to **Settings** → **Environment Variables**
2. Add the following environment variables:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Production, Preview, Development |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Production, Preview, Development |

3. To get your Supabase credentials:
   - Go to your Supabase project dashboard
   - Navigate to **Settings** → **API**
   - Copy the **Project URL** and **anon/public** key
   - Paste them into Vercel's environment variables

4. Make sure to add them for all three environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. Click **"Save"**

### Step 6: Redeploy (If Needed)

If you added environment variables after the initial deployment:

1. Go to the **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Select **"Redeploy"**
4. Confirm the redeployment

Or simply push a new commit to trigger a new deployment.

### Step 7: Verify Deployment

1. Once deployment completes, click on your deployment
2. Click **"Visit"** to open your live site
3. Test the application:
   - Visit the homepage
   - Test form submission
   - Test waitlist signup
   - Check browser console for errors

### Step 8: Custom Domain (Optional)

If you want a custom domain:

1. Go to **Settings** → **Domains**
2. Enter your domain name
3. Follow Vercel's instructions to configure DNS records
4. Wait for DNS propagation (can take a few minutes to 48 hours)

## Troubleshooting

### Build Fails

- **Check build logs**: Click on the failed deployment to see error details
- **Environment variables**: Ensure all required env vars are set
- **Node version**: Vercel uses Node 18.x by default (should work fine for Next.js 14)

### Runtime Errors

- **Check function logs**: Go to your deployment → **Functions** tab
- **Supabase connection**: Verify your Supabase URL and anon key are correct
- **CORS issues**: Check Supabase settings if you see CORS errors

### Environment Variables Not Working

- Make sure variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding/changing environment variables
- Check that variables are added to the correct environment (Production/Preview/Development)

## Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] Form submission works
- [ ] Waitlist signup works
- [ ] Analytics events are being tracked (check Supabase dashboard)
- [ ] All pages are accessible
- [ ] Mobile responsive design works

## Continuous Deployment

Vercel automatically deploys:
- **Production**: On push to your main/master branch
- **Preview**: On push to other branches and pull requests

No additional configuration needed!

## Useful Vercel Features

- **Preview Deployments**: Every PR gets a unique preview URL
- **Analytics**: View page views and performance metrics
- **Logs**: Real-time server logs in the dashboard
- **Speed Insights**: Automatic performance monitoring

## Next Steps

- Set up custom domain
- Configure analytics (Vercel Analytics or your own)
- Set up monitoring/alerts
- Configure automatic backups for Supabase data

---

**Need Help?** Check Vercel's documentation: https://vercel.com/docs

