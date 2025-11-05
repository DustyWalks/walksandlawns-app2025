# Walks & Lawns Design Guidelines

## Design Approach
**Reference-Based Strategy**: Drawing from Airbnb's trust-building visual language, Stripe's seamless checkout experience, and local service platform patterns. Focus on professional-yet-approachable aesthetic that converts Edmonton homeowners into subscribers.

## Core Design Elements

### Typography
- **Primary Font**: Inter (Google Fonts) - Modern, highly legible for UI and content
- **Headings**: Bold (700) for H1/H2, Semibold (600) for H3/H4
- **Body**: Regular (400), line-height 1.6 for readability
- **Sizes**: H1: 3xl-5xl responsive, H2: 2xl-4xl, Body: base-lg

### Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-16 (mobile) to py-24 (desktop)
- Component gaps: 6-8 units
- Container: max-w-7xl for full sections, max-w-4xl for focused content

### Component Library

**Navigation**
- Sticky header with logo left, navigation center, CTA button right
- Mobile: Hamburger menu with slide-out drawer
- Include: Services, Pricing, How It Works, Dashboard (if logged in)

**Buttons**
- Primary: Rounded-lg, px-8 py-4, font-semibold, shadow-md
- When on images: Backdrop blur effect (backdrop-blur-sm bg-white/90)
- No custom hover states - rely on component defaults

**Cards**
- Rounded-xl with subtle shadow (shadow-lg)
- White background with border-2 for emphasis
- Padding: p-8
- Hover: Subtle lift (transform scale-105 transition)

## Landing Page Structure

### Hero Section (100vh)
**Layout**: Full-screen split - left: compelling headline + CTA, right: large hero image
- Headline: "Year-Round Property Care, One Simple Subscription"
- Subheadline: Emphasize $188/month value (snow + lawn + cleanups)
- Primary CTA: "Start Your Subscription" (prominent, action-oriented)
- Trust indicator: "Trusted by 500+ Edmonton Homeowners"
- Hero image: Professional photo of maintained lawn/property in Edmonton setting

### Value Proposition (3-column grid)
- Winter Services card: Snow removal icon, key benefits
- Summer Services card: Lawn care icon, weekly mowing details
- Seasonal Services card: Spring/fall cleanup visuals
- Each card: Icon, bold title, 2-3 benefit bullets, subtle hover effect

### Pricing Section
**Layout**: Centered pricing card (max-w-2xl) with add-ons below
- Main subscription: Large card highlighting $188/month, all included services
- Add-ons: 4-column grid (responsive to 2-col mobile): Premium snow, aeration, fertilization, extra lawns
- Each add-on: Checkbox-style card, monthly/one-time toggle, clear pricing
- Embedded Stripe checkout button at bottom

### How It Works (4-step process)
**Layout**: Horizontal timeline on desktop, vertical on mobile
- Step 1: Subscribe online
- Step 2: AI confirms & schedules
- Step 3: Automated service delivery
- Step 4: Manage via dashboard
- Use numbered circles, connecting lines, icons for each step

### Social Proof
**Layout**: 2-column testimonial grid with photos
- 4-6 customer testimonials with authentic photos
- Name, neighborhood (e.g., "Sarah M., Mill Woods")
- Star ratings, specific service mentions
- Before/after photo grid below testimonials (4-col masonry)

### FAQ Section
**Layout**: 2-column accordion-style
- 8-10 common questions about subscription, services, scheduling
- Expandable panels with smooth transitions
- Icons for visual scanning

### CTA Section
**Layout**: Full-width background treatment with centered content
- Headline: "Ready for Hassle-Free Property Maintenance?"
- Subtext: Reinforce automation and local service
- Large CTA button repeating primary action
- Secondary link to dashboard for existing customers

### Footer
**Layout**: 3-column (4-col on wide screens)
- Column 1: Logo, tagline, Edmonton address
- Column 2: Quick links (Services, Pricing, Dashboard, Contact)
- Column 3: Contact info, email, phone
- Column 4: Newsletter signup form
- Bottom bar: Copyright, Privacy Policy, Terms

## Customer Dashboard

### Layout
- Sidebar navigation (collapsible on mobile): Overview, Services, Add-ons, Billing, Profile
- Main content area with cards for:
  - Active subscription status (seasonal service indicator)
  - Upcoming service calendar (next 30 days)
  - Service history timeline
  - Quick add-on purchase cards
  - AI chatbot widget (bottom-right, expandable)

### Dashboard Cards
- Consistent card style from landing page
- Status badges for active/scheduled services
- Action buttons for managing subscription
- Visual calendar component with service markers

## AI Chatbot Widget
- Floating button (bottom-right corner, all pages)
- Expands to chat interface (rounded-2xl, shadow-2xl)
- Message bubbles with timestamps
- Quick action buttons for common requests
- Input field with send button

## Images
1. **Hero**: Large, high-quality image of well-maintained Edmonton property (lawn + exterior), professional photography, seasonal (show both summer/winter in split or toggle)
2. **Service Cards**: Icon illustrations or photos representing snow removal, lawn mowing, cleanup services
3. **Testimonials**: Authentic customer photos (headshots)
4. **Before/After**: Grid of transformation photos showcasing service quality
5. **How It Works**: Illustrated icons for each step
6. **Footer**: Small logo mark

## Accessibility & Polish
- High contrast ratios (WCAG AA minimum)
- Focus states on all interactive elements
- Aria labels for screen readers
- Smooth scroll behavior between sections
- Loading states for Stripe checkout
- Success/error notifications for form submissions
- Mobile-first responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## Animation Strategy
**Minimal & Purposeful**:
- Scroll-triggered fade-ins for section entries (subtle, once)
- Card hover lifts
- Smooth accordion expansions
- No parallax, no continuous animations
- Focus on performance over flashiness