# Vibe-Coding Progress Report: Canvas Dashboard Iterations

## 1. Starting Point

The original direction began as a Canvas dashboard redesign centered on reducing scattered course information. The early website idea focused on a clearer dashboard, course cards, recent updates, and a stronger to-do surface. At that stage, the UI was mostly a static layout: it showed the major regions, but the calendar, update trays, responsive behavior, and notification interactions were not yet deeply prototyped.

## 2. Iteration 3: Calendar-First Concept

The third iteration moved the design toward a calendar-first structure. The goal was to make deadlines feel spatially memorable instead of buried in a to-do list.

Major upgrades:
- Introduced a calendar-led `To Do` area.
- Added course-color coded deadline markers.
- Used compact square markers inspired by condensed calendar systems.
- Added one-letter course indicators inside each square so the color coding was not the only cue.
- Added hover tooltips that explain the course, assignment, and due time.
- Reworked the right-side notification area into icon-based entry points for announcements, feedback, and discussions.

Codex refinement:
- The right panel now starts in a zero state with only icons visible.
- Hovering or clicking an icon opens a floating tray.
- Moving away from the icon/tray closes the opened tray, making the microinteraction feel lightweight instead of sticky.
- Tooltip placement now adapts to position: bottom cells open upward, left-edge cells open right, and right-edge cells open left.

## 3. Iteration 3 Calendar Shift: Weekly to Monthly

After testing the weekly timeline version, the square-marker idea proved better suited to a monthly view. Weekly time-grid placement made corner and low-position tooltips harder to use, and the day-strip control was unnecessary for a monthly concept.

Major upgrade:
- Iteration 3 now uses a monthly calendar grid.
- Removed the day-strip selector.
- Replaced it with simple `Previous month` and `Next month` controls.
- Added a `Jump` selector for deeper navigation, such as `Previous 3 months`, `Next 3 months`, or `Semester`.

Design rationale:
- Monthly view is better for scanning distributed deadlines.
- The square markers feel more useful when seen across many dates.
- The tooltip model works better when markers sit inside date cells rather than along a dense time axis.

## 4. Iteration 4: Weekly Timeline Concept

The fourth iteration became the more literal calendar/timeline version. Instead of abstract square blobs, it uses rectangular event cards with visible due time, assignment name, and course.

Major upgrades:
- Changed Iteration 4 into a weekly timeline view.
- Added horizontal time rails.
- Added a live red current-time indicator that updates while the app is open.
- Positioned due cards vertically by time.
- Kept course colors as primary visual identifiers.
- Added `Previous week` and `Next week` controls.
- Added a `Jump` selector for cases like `Past 3 weeks`, `Next 3 weeks`, or `Month`.

Design rationale:
- Weekly view is best when timing matters.
- Rectangular cards are better than square markers when users need details immediately.
- The live time marker makes the screen feel like an active planning surface instead of a static schedule.

## 5. Right-Side Updates and Notification Panels

The right-side area evolved from static lists into interactive update surfaces.

Major upgrades:
- Announcements and feedback became tabbed panels in Iteration 4.
- Items can be dismissed after being read.
- Scrollable panels support more than five pending items.
- Iteration 3 uses icon-first notification access to keep the layout quieter.
- Iteration 3 trays open on hover/click and close when the user leaves the interaction area.

Design rationale:
- Iteration 3 stays exploratory and compact.
- Iteration 4 becomes more application-like and explicit.
- Both versions support notification density without permanently overwhelming the screen.

## 6. Course Cards Reintroduced

The earlier `Course Summary` rows were replaced with the stronger `Your courses` card section.

Major upgrades:
- Course cards now appear under the calendar in Iterations 3 and 4.
- Each card includes course code, title, instructor, schedule, due count, post count, and course color.
- This better connects the calendar tasks back to the full course context.

Design rationale:
- The cards are more consistent with the dashboard source concept.
- They preserve the original Canvas-course mental model while still prioritizing deadlines.

## 7. Responsive Improvements

The prototype was adapted for desktop, iPad, and iPhone 16-style dimensions.

Major upgrades:
- Desktop keeps the sidebar rail and split content layout.
- iPad stacks main content and update panels to avoid cramped sidebars.
- Mobile uses a fixed bottom navigation bar.
- Calendar grids own their horizontal scrolling instead of forcing page-wide overflow.
- Topbar/search compresses for small screens.
- Course cards and rows wrap safely.

Tested viewport examples:
- Desktop: `1440x900`
- iPhone 16 wireframe: `393x852`
- iPad: `834x1194`

## 8. Same-Time Deadline Grouping

When two or more deadlines fall in the same time window on the same day, the previous version stacked the cards with a small horizontal offset, which produced a visually noisy overlap (for example, `Reading Response 7` and `Problem Set 5` both due at 11:59 PM).

Major upgrade:
- Items sharing a due time on the same day now collapse into a single grouped block.
- The block has one shared `Due 11:59 PM` header plus an `N items` count.
- Each assignment sits as its own row inside, separated by hairline dividers and prefixed with its course-color stripe.
- Days with only one item at that time keep the original single-card styling unchanged.

Design rationale:
- The grouped block makes the shared deadline window unambiguous instead of implying two separate slots.
- It preserves course color identification per item.
- It avoids cascading overlap that previously truncated titles and obscured the second item.

## 9. Microinteractions Added

Subtle motion was added to improve perceived quality without making the interface feel decorative.

Motion upgrades:
- Soft hover lift on cards and controls.
- Press feedback on buttons.
- Tray pop-in animation.
- Notification rows highlight on hover.
- Deadline markers respond subtly on hover/press.
- Current-time label gently pulses.
- Motion respects `prefers-reduced-motion`.

Design rationale:
- The motion clarifies interactivity.
- It makes the prototype feel more like a usable app.
- It avoids heavy animation that would distract from academic task management.

## 10. Navigation Depth: Beyond One Step

The user may want to move more than one week or month, such as jumping ahead three weeks.

Implemented answer:
- Keep `Previous` and `Next` buttons for the most common adjacent movement.
- Add a compact `Jump` selector for larger navigation.

Iteration 3 options:
- `This month`
- `Previous 3 months`
- `Next 3 months`
- `Semester`

Iteration 4 options:
- `This week`
- `Past 3 weeks`
- `Next 3 weeks`
- `Month`

Why this is effective:
- It avoids cluttering the main calendar header.
- It keeps the primary movement simple.
- It gives power users a deeper navigation path without needing repeated clicks.

## 11. Current State

The prototype now has two clearly differentiated calendar concepts:

Iteration 3:
- Monthly calendar
- Square course-coded deadline markers
- Adaptive hover tooltips
- Icon-first right-panel tray
- Best for broad deadline awareness

Iteration 4:
- Weekly time-based calendar
- Rectangular event cards
- Live current-time line
- Tabbed announcements and feedback
- Best for schedule-level planning

## 12. Summary of Vibe-Coding Progress

The work moved from broad concept sketches into a functional, testable React prototype. The key shift was using Codex not only to implement visual ideas, but to pressure-test interaction logic, responsive behavior, overflow, calendar semantics, and microinteractions.

The design direction matured from:
- static dashboard idea
- to calendar-first deadline exploration
- to distinct monthly and weekly calendar models
- to responsive, interactive, prototype-ready UI states

This gives the project a stronger story: the iterations are no longer only visual alternatives. They now represent different product strategies for helping students understand what is due, when it is due, and what course context it belongs to.
