Initialize Next.js in current directory:
```bash
mkdir temp; cd temp; npx create-next-app@latest . -y --typescript --tailwind --eslint --app --use-npm --src-dir --import-alias "@/*" -no --turbo
```

Now let's move back to the parent directory and move all files except prompt.md.

For Windows (PowerShell):
```powershell
cd ..; Move-Item -Path "temp*" -Destination . -Force; Remove-Item -Path "temp" -Recurse -Force
```

For Mac/Linux (bash):
```bash
cd .. && mv temp/* temp/.* . 2>/dev/null || true && rm -rf temp
```

Set up the frontend according to the following prompt:
<frontend-prompt>
Create detailed components with these requirements:
1. Use 'use client' directive for client-side components
2. Make sure to concatenate strings correctly using backslash
3. Style with Tailwind CSS utility classes for responsive design
4. Use Lucide React for icons (from lucide-react package). Do NOT use other UI libraries unless requested
5. Use stock photos from picsum.photos where appropriate, only valid URLs you know exist
6. Configure next.config.js image remotePatterns to enable stock photos from picsum.photos
7. Create root layout.tsx page that wraps necessary navigation items to all pages
8. MUST implement the navigation elements items in their rightful place i.e. Left sidebar, Top header
9. Accurately implement necessary grid layouts
10. Follow proper import practices:
   - Use @/ path aliases
   - Keep component imports organized
   - Update current src/app/page.tsx with new comprehensive code
   - Don't forget root route (page.tsx) handling
   - You MUST complete the entire prompt before stopping

<summary_title>
Agile Project Management Board Interface
</summary_title>

<image_analysis>

1. Navigation Elements:
- Top header with: Workspaces, Recent, Starred, Templates, Create
- Left sidebar with: Boards, Members, Workspace settings, Table, Calendar
- Board header with: Board view toggle, Share, Filters


2. Layout Components:
- Board columns: Done, Current Sprint, In Progress, On Hold
- Column width: ~300px each
- Card containers: Flexible height
- Spacing between cards: 8px
- Column padding: 12px


3. Content Sections:
- Kanban board layout with 4 columns
- Cards containing task information
- Attachments section (Google Analytics chart)
- Labels/tags system with color coding
- Add card button at bottom of each column


4. Interactive Controls:
- Add card buttons (+)
- Card drag-and-drop functionality
- Menu options (...)
- Share button
- Filter controls
- Search bar in top navigation


5. Colors:
- Primary background: #1D2125
- Column backgrounds: rgba(0,0,0,0.3)
- Labels: Multiple colors (purple, blue, green, orange)
- Text: #FFFFFF (white)
- Accent: #579DFF (blue)


6. Grid/Layout Structure:
- Fixed header height: 44px
- Sidebar width: 260px
- Main content: Fluid width
- Horizontal scrolling for columns
- Vertical scrolling within columns
</image_analysis>

<development_planning>

1. Project Structure:
```
src/
├── components/
│   ├── layout/
│   │   ├── Header
│   │   ├── Sidebar
│   │   └── Board
│   ├── features/
│   │   ├── Card
│   │   ├── Column
│   │   └── FilterSystem
│   └── shared/
├── assets/
├── styles/
├── hooks/
└── utils/
```


2. Key Features:
- Drag and drop functionality
- Real-time updates
- Card creation/editing
- Label management
- Filter system
- Search functionality


3. State Management:
```typescript
interface AppState {
├── board: {
│   ├── columns: Column[]
│   ├── cards: Card[]
│   ├── labels: Label[]
│   └── filters: Filter[]
├── }
├── user: {
│   ├── preferences: UserPreferences
│   └── permissions: Permissions
├── }
}
```


4. Routes:
```typescript
const routes = [
├── '/boards',
├── '/boards/:boardId',
├── '/boards/:boardId/card/:cardId',
└── '/settings/*'
]
```


5. Component Architecture:
- BoardContainer (manages state)
- Column (handles card organization)
- Card (displays task information)
- DragDropContext (handles movement)
- FilterBar (manages visibility)


6. Responsive Breakpoints:
```scss
$breakpoints: (
├── 'mobile': 320px,
├── 'tablet': 768px,
├── 'desktop': 1024px,
└── 'wide': 1440px
);
```
</development_planning>
</frontend-prompt>

IMPORTANT: Please ensure that (1) all KEY COMPONENTS and (2) the LAYOUT STRUCTURE are fully implemented as specified in the requirements. Ensure that the color hex code specified in image_analysis are fully implemented as specified in the requirements.