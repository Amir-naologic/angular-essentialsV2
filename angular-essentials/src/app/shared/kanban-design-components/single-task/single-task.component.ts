import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    PLATFORM_ID,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ConfigureSingleTaskComponent } from "../dropdown/configure-single-task.component";
import { SingleTaskInformationComponent } from "../single-task-information/single-task-information.component";
import { DropdownItems, MenuItems, TaskSection } from "../../utils/utils";
import type { Draggable as DraggableType } from '@shopify/draggable';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaskDetailSidebarComponent } from "../../task-detail-sidebar/task-detail-sidebar.component";

@Component({
    selector: 'app-single-task',
    imports: [
        CommonModule,
        ConfigureSingleTaskComponent,
        SingleTaskInformationComponent,
        FormsModule,
        ReactiveFormsModule,
        TaskDetailSidebarComponent
    ],
    templateUrl: './single-task.component.html',
    styleUrls: ['./single-task.component.scss'],
})
export class SingleTaskComponent implements AfterViewInit, OnDestroy {
    /**
     * Reference data for each swimlane in the Kanban board.
     */
    public taskSections: TaskSection[] = [
        {
            id: 'section-1',
            title: 'Unpaid',
            tasks: [
                { id: 1, title: 'Mega Electronix' },
                { id: 2, title: 'Unpaid' }
            ],
            editing: false,
            activeDropdown: null
        },
        {
            id: 'section-2',
            title: 'Overdue',
            tasks: [
                { id: 3, title: 'Id 3' },
                { id: 4, title: 'ID 4' }
            ],
            editing: false,
            activeDropdown: null
        }
    ];
    /**
     * Stores the card counts for each swimlane.
     */
    public ticketCounter: { [sectionId: string]: number } = {};
    /**
     * Dropdown Items used for the dropdown component.
     */
    public dropdownItems: DropdownItems[] = [
        { label: 'Edit', icon: 'assets/icons/box_person.svg', action: () => {} },
        { label: 'Duplicate', icon: 'assets/icons/brush.svg', action: () => {} },
        { label: 'Copy ID', icon: 'assets/icons/wallet.svg', action: () => {} },
        { label: 'Copy link', icon: 'assets/icons/copy.svg', action: () => {} },
        { label: 'Delete', icon: 'assets/icons/delete.svg', action: () => {} }
    ];
    /**
     * A reference to the dropdown component, which can be toggled from the code.
     */
    @ViewChild('dropdownCmp') public dropdownCmp: ConfigureSingleTaskComponent | null = null;
    /**
     * A collection of references to the task info elements in the template.
     */
    @ViewChild('taskInfo') public taskInfos: QueryList<ElementRef> = new QueryList<ElementRef>();
    /**
     * A collection of references to the swimlane elements in the template.
     */
    @ViewChildren('swimLanes') public swimLanes: QueryList<ElementRef> = new QueryList<ElementRef>();
    /**
     * Instance of Draggable for cards
     */
    private draggableCards: DraggableType | null = null;
    /**
     * Instance of Draggable for swimlanes
     */
    private draggableColumns: DraggableType | null = null;
    /**
     * Debouncing timer used to avoid calling the reinitialization too frequently.
     */
    private reinitTimer: ReturnType<typeof setTimeout> | null = null;
    /**
     * Controls whether the sidebar component is rendered in the DOM.
     */
    public sidebarMounted: boolean = false;
    /**
     * Tracks the current animation state of the sidebar.
     */
    public animationState: 'enter' | 'leave' | null = null;
    /**
     * Reference to the Menu items for task card.
     */
    public menuItems: MenuItems[] = [
        {
            key: 'subtasks',
            label: '1/4 subtasks',
            icon: 'assets/icons/box_check.svg',
            options: [
                { initials: 'O', label: 'Me', color: '#e7e6fd', initialsColor: '#3E40DB' },
                { initials: 'D', label: 'Darren Colborn', color: '#c7e6f8', initialsColor: '#2CB1FF' },
                { initials: 'M', label: 'Mikayla Hanson', color: '#d6f7f3', initialsColor: '#00B0BF' },
                { initials: 'J', label: 'Josephine Mason', color: '#e5cbfc', initialsColor: '#8800FF' }
            ]
        },
        {
            key: 'status',
            label: 'Unpaid',
            icon: 'assets/icons/status.svg',
            options: [
                { initials: 'O', label: 'Unpaid', color: '#e7e6fd' },
                { initials: 'D', label: 'Overdue', color: '#c7e6f8' },
                { initials: 'M', label: 'Paid in full', color: '#d6f7f3' },
                { initials: 'J', label: 'Paid partially', color: '#e5cbfc' }
            ]
        },
        {
            key: 'assigned',
            label: 'Florin Galan',
            icon: 'assets/icons/person.svg',
            options: [
                { initials: 'O', label: 'Me', color: '#e7e6fd' },
                { initials: 'D', label: 'Darren Colborn', color: '#c7e6f8' },
                { initials: 'M', label: 'Mikayla Hanson', color: '#d6f7f3' },
                { initials: 'J', label: 'Josephine Mason', color: '#e5cbfc' }
            ]
        },
        {
            key: 'date',
            label: 'September 9, 2024',
            icon: 'assets/icons/date.svg',
            options: [
                { initials: 'O', label: 'Me', color: '#e7e6fd' },
                { initials: 'D', label: 'Darren Colborn', color: '#c7e6f8' },
                { initials: 'M', label: 'Mikayla Hanson', color: '#d6f7f3' },
                { initials: 'J', label: 'Josephine Mason', color: '#e5cbfc' }
            ]
        },
        {
            key: 'priority',
            label: 'Urgent',
            icon: 'assets/icons/urgent.svg',
            options: [
                { initials: 'O', label: 'Me', color: '#e7e6fd' },
                { initials: 'D', label: 'Darren Colborn', color: '#c7e6f8' },
                { initials: 'M', label: 'Mikayla Hanson', color: '#d6f7f3' },
                { initials: 'J', label: 'Josephine Mason', color: '#e5cbfc' }
            ]
        }
    ];


    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(DOCUMENT) private readonly document: Document
    ) {}


    /**
     * Toggles the dropdown component.
     */
    public onToggleDropdown(): void {
        this.dropdownCmp?.toggleDropdown();
    }

    /**
     * Enables edit mode on the section title.
     */
    public enableEdit(section: TaskSection): void {
        section.editing = true;
    }

    /**
     * Disables the edit mode and update the section title from the input.
     */
    public disableEdit(section: TaskSection, newValue: Event): void {
        // -->Set: Editing to false
        section.editing = false;

        // -->Get: event target as an HTMLInputElement to retrieve the value.
        const inputEl = newValue.target as HTMLInputElement;
        const typedValue = inputEl.value;

        // -->Update: section title if the input has non-empty content.
        section.title = typedValue.trim() || section.title;
    }

    /**
     * Initializes the draggable functionality for the swimlanes.
     */
    public async setColumnsDraggable(): Promise<void> {
        // -->Destroy: existing draggable instance for swimlanes.
        if (this.draggableColumns) {
            this.draggableColumns.destroy();
        }

        // -->Import: Dynamically Sortable and its Plugins.
        const { Sortable, Plugins } = await import('@shopify/draggable');
        const { SwapAnimation, ResizeMirror } = Plugins;

        // -->Create: Sortable
        this.draggableColumns = new Sortable(this.document.querySelectorAll('.swimLanes'), {
            draggable: '.draggable-column',
            delay: 100,
            swapAnimation: {
                duration: 200,
                easingFunction: 'ease-in-out',
                horizontal: true,
            },
            mirror: {
                constrainDimensions: true,
            },
            plugins: [SwapAnimation, ResizeMirror],
        });

        // -->Set: On mirror create and add a styling class.
        this.draggableColumns.on('mirror:created', (event: any) => {
            event.originalEvent?.stopPropagation?.();
            event.mirror.classList.add('is-column');
        });

        // -->Set: On mirror destroy update DOM counts and reinitialize draggable instances.
        this.draggableColumns.on('mirror:destroy', (event: any) => {
            event.mirror.classList.remove('is-column');
            setTimeout(() => {
                this.updateCardCounts();
                this.scheduleReinitialize();
            }, 0);
        });
    }

    /**
     * Initialize the draggable functionality for individual task cards.
     */
    public async setCardsDraggable(): Promise<void> {
        // -->Destroy: existing draggable instance for cards.
        if (this.draggableCards) {
            this.draggableCards.destroy();
        }

        // -->Destroy: existing draggable instance for swimlanes.
        if (this.draggableColumns) {
            this.draggableColumns.destroy();
        }

        // -->Import: Dynamically Sortable and its Plugins.
        const { Sortable, Plugins } = await import('@shopify/draggable');
        const { ResizeMirror } = Plugins;

        // -->Create: Sortable
        this.draggableCards = new Sortable(this.document.querySelectorAll('.taskInfo'), {
            draggable: '.draggable',
            delay: 100,
            mirror: {
                constrainDimensions: true,
            },
            plugins: [ResizeMirror],
        });

        // -->Set: On drag start, destroy columns draggable instance if exists.
        this.draggableCards.on('drag:start', () => {
            if (this.draggableColumns) {
                this.draggableColumns.destroy();
                this.draggableColumns = null;
            }
        });

        // -->Set: On mirror create and add a styling class.
        this.draggableCards.on('mirror:created', (event: any) => {
            event.originalEvent?.stopPropagation?.();
            event.mirror.classList.add('is-card');
        });

        // -->Set: On mirror destroy update DOM counts and reinitialize draggable instances.
        this.draggableCards.on('mirror:destroy', (event: any) => {
            event.mirror.classList.remove('is-card');
            setTimeout(() => {
                this.updateCardCounts();
                this.scheduleReinitialize();
            }, 0);
        });
    }

    /**
     * Schedule the reinitialization of draggable instances to keep them in sync with DOM changes.
     */
    private scheduleReinitialize(): void {
        if (this.reinitTimer) {
            clearTimeout(this.reinitTimer);
        }
        this.reinitTimer = setTimeout(() => {
            this.setCardsDraggable();
            this.setColumnsDraggable();
        }, 100);
    }

    /**
     * After the view initializes, set up the draggable instances and perform the initial DOM count.
     */
    public async ngAfterViewInit(): Promise<void> {
        if (isPlatformBrowser(this.platformId)) {
            // -->Init: draggable functionality for both cards and swimlanes
            await this.setCardsDraggable();
            await this.setColumnsDraggable();

            // -->Run: an initial count of tasks for each swimlane.
            this.updateCardCounts();

            // -->Subscribe: to changes in task information elements.
            this.taskInfos.changes.subscribe(() => this.scheduleReinitialize());

            // -->Subscribe: to changes in swimlane elements.
            this.swimLanes.changes.subscribe(() => this.scheduleReinitialize());
        }
    }

    /**
     * ngOnDestroy to clean up by destroying any draggable instances and clearing timers.
     */
    public ngOnDestroy(): void {
        if (this.draggableColumns) {
            this.draggableColumns.destroy();
            this.draggableColumns = null;
        }
        if (this.draggableCards) {
            this.draggableCards.destroy();
            this.draggableCards = null;
        }
        if (this.reinitTimer) {
            clearTimeout(this.reinitTimer);
        }
    }

    /**
     * Counts number of cards in a swimlane
     */
    private updateCardCounts(): void {
        // -->Get: all elements that represent a swimlane
        const columns = this.document.querySelectorAll('.draggable-column');

        // -->Reset: ticketCounter object
        this.ticketCounter = {};

        // -->Iterate: over each swimlane element
        Array.from(columns).forEach((colEl: Element) => {
            // -->Get: section id from the data attribute on the column
            const sectionId = colEl.getAttribute('data-section-id');
            if (!sectionId) {
                return;
            }

            // -->Get: container with the tasks within this swimlane
            const taskInfo = colEl.querySelector('.taskInfo');
            if (!taskInfo) {
                // -->Set: count to 0
                this.ticketCounter[sectionId] = 0;

                return;
            }

            // -->Get: all elements with the 'draggable' class inside this task container
            const allDraggables = Array.from(taskInfo.querySelectorAll('.draggable'));

            // -->Filter: any elements that have modifier classes
            const realCards = allDraggables.filter((draggable) => {
                const classListString = draggable.classList.toString();
                const hasModifierClass = classListString.includes('draggable--');

                // -->Ensure the draggable is actually within this taskInfo element
                return !hasModifierClass && draggable.closest('.taskInfo') === taskInfo;
            });

            // -->Store: the count for this section based on its unique id
            this.ticketCounter[sectionId] = realCards.length;
        });
    }

    /**
     * Toggle the dropdown for a given menu key.
     */
    public toggleDropdown(card: TaskSection, key: string): void {
        card.activeDropdown = (card.activeDropdown === key) ? null : key;
    }

    /**
     * Shows sidebar component.
     */
    public showSidebar(): void {
        // -->Guard: Prevent re-triggering if sidebar is already animating in
        if (this.animationState === 'enter'){
            return
        }

        // -->Mount: Render the sidebar component in the DOM
        this.sidebarMounted = true;

        // -->Set: animation state to 'enter' after mount to start entrance animation
        setTimeout(() => {
            this.animationState = 'enter';
        }, 0);
    }

    /**
     * Handles the animation end and unmounts the component.
     */
    public hideSidebar(): void {
        this.animationState = 'leave';

        // -->Match: Animation duration
        setTimeout(() => {
            this.sidebarMounted = false;
            this.animationState = null;
        }, 200);
    }
}