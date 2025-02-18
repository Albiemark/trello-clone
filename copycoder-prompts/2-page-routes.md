Set up the page structure according to the following prompt:
   
<page-structure-prompt>
Next.js route structure based on navigation menu items (excluding main route). Make sure to wrap all routes with the component:

Routes:
- /workspaces
- /recent
- /starred
- /templates
- /create
- /boards
- /members
- /workspace-settings
- /table
- /calendar
- /board-view-toggle
- /share
- /filters

Page Implementations:
/workspaces:
Core Purpose: Display and manage all user workspaces
Key Components
- WorkspaceGrid: Grid of workspace cards
- WorkspaceSearch: Search

/filter workspaces
- CreateWorkspaceButton: Quick access to create new
Layout Structure:
- Responsive grid layout (1-4 columns)
- Sidebar navigation
- Top action bar

/recent:
Core Purpose: Show recently accessed items
Key Components
- TimelineList: Chronological list of items
- FilterBar: Filter by type

/date
- ActivityIndicators: Last access timestamps
Layout Structure:
- Vertical scrolling list
- Sticky header
- Time-based grouping

/starred:
Core Purpose: Display favorited items
Key Components
- StarredGrid: Grid of starred items
- CategoryTabs: Filter by item type
- QuickActions: Star

/unstar buttons
Layout Structure:
- Masonry grid layout
- Category navigation
- Empty state messaging

/templates:
Core Purpose: Browse and select templates
Key Components
- TemplateGallery: Template previews
- CategoryFilter: Template categories
- TemplatePreview: Detailed view
Layout Structure
- Gallery grid
- Category sidebar
- Preview modal

/create:
Core Purpose: Create new workspace items
Key Components
- TemplateSelector: Choose starting point
- ConfigurationForm: Setup options
- PreviewPane: Live preview
Layout Structure
- Two-column layout
- Wizard steps
- Mobile-responsive stack

/boards:
Core Purpose: View all boards in workspace
Key Components
- BoardList: List of boards
- ViewToggle: List/Grid view
- SortOptions: Sort by various criteria
Layout Structure
- Flexible list

/members:
Core Purpose: Manage workspace members
Key Components
- MemberList: Member directory
- InviteForm: Add new members
- RoleManager: Adjust permissions
Layout Structure
- Table layout
- Action sidebar
- Mobile-friendly list

/workspace-settings:
Core Purpose: Configure workspace preferences
Key Components
- SettingsForm: Configuration options
- PermissionMatrix: Access controls
- WorkspaceInfo: Basic details
Layout Structure
- Tabbed interface
- Form sections
- Confirmation dialogs

/table:
Core Purpose: Display data in table format
Key Components
- DataTable: Main table component
- ColumnCustomizer: Column management
- FilterBar: Data filtering
Layout Structure
- Full-width table
- Fixed header
- Resizable columns

/calendar:
Core Purpose: Calendar view of items
Key Components
- CalendarGrid: Main calendar
- EventCreator: Add events
- ViewSelector: Day/Week/Month
Layout Structure
- Calendar grid
- Side panel
- Responsive scaling

/board-view-toggle:
Core Purpose: Switch between view modes
Key Components
- ViewOptions: Available views
- PreviewThumbnails: View previews
- QuickSwitch: Fast toggle
Layout Structure
- Modal overlay
- Grid of options
- Preview pane

/share:
Core Purpose: Share workspace items
Key Components
- ShareForm: Sharing options
- PermissionSelector: Access levels
- LinkGenerator: Share links
Layout Structure
- Modal dialog
- Permission matrix
- Copy options

/filters:
Core Purpose: Filter workspace items
Key Components
- FilterBuilder: Create filters
- SavedFilters: Manage presets
- FilterPreview: Results preview
Layout Structure
- Side panel
- Filter stack
- Results view

Layouts:
MainLayout:
- Applicable routes: All except /create
- Core components: Navigation, Header, Footer
- Responsive behavior: Collapsible sidebar, mobile menu

ModalLayout
- Applicable routes: /share, /board-view-toggle
- Core components: Modal container, Backdrop
- Responsive behavior: Full-screen on mobile

ConfigLayout
- Applicable routes: /workspace-settings, /filters
- Core components: Sidebar, Content area
- Responsive behavior: Stack on mobile
</page-structure-prompt>