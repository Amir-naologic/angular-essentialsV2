import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BehaviorSubject, from, Observable, of, Subject, Subscription} from 'rxjs';
import { catchError, finalize, mergeMap, takeUntil, tap } from 'rxjs/operators';

/**
 * Interface for each upload file state
 */
interface FileUploadState {
  name: string;
  progress: number;
  completed: boolean;
  error: boolean;
  cancel$: Subject<void>;
}

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  /**
   * Map containing all uploads with file name as key
   */
  private uploads: FileUploadState[] = [];
  /**
   * Emits the list of file upload states to the UI
   */
  private fileUploadStatesSubject = new BehaviorSubject<FileUploadState[]>([]);
  /**
   * Observable stream of file upload states
   */
  public fileUploadStates$ = this.fileUploadStatesSubject.asObservable();
  /**
   * Triggered when user selects files via input
   */
  public onFileSelected(event: Event): void {
    // -->Get: selected files
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files){
      return
    }

    // -->Upload: handle each file with concurrency (max 3 at the same time)
    from(Array.from(files))
        .pipe(mergeMap(file => this.uploadFile(file), 3))
        .subscribe();
  }

  /**
   * Handles uploading a single file with mock progress and cancellation support
   */
  public uploadFile(file: File): Observable<number | undefined> {
    // -->Create: cancellation signal for this file
    const cancel$ = new Subject<void>();

    // -->Set: initial state of the file upload
    const fileState: FileUploadState = {
      name: file.name,
      progress: 0,
      completed: false,
      error: false,
      cancel$,
    };

    // -->Store: upload state and notify UI
    this.uploads.push(fileState);
    this.updateStates();

    // -->Upload: perform simulated upload
    return this.mockUpload().pipe(
        // -->Cancel: allow termination when cancel$ emits
        takeUntil(cancel$),

        // -->Update: progress percentage
        tap(progress => {
          fileState.progress = progress;
          this.updateStates();
        }),

        // -->Complete: mark as completed when done
        finalize(() => {
          fileState.completed = fileState.progress === 100;
          this.updateStates();
        }),

        // -->Error: mark as failed if error occurs
        catchError(() => {
          fileState.error = true;
          this.updateStates();

          // -->Return: empty observable to complete stream
          return of(undefined);
        })
    );
  }

  /**
   * Cancel a file upload in progress by its file name
   */
  public cancelUpload(fileName: string): void {
    // -->Find: corresponding upload state
    const fileState = this.uploads.find(f => f.name === fileName);

    if (fileState) {
      // -->Emit: signal to cancel and close stream
      fileState.cancel$.next();
      fileState.cancel$.complete();
    }
  }

  /**
   * Push updated state to subscribers
   */
  private updateStates(): void {
    this.fileUploadStatesSubject.next(Array.from(this.uploads.values()));
  }

  /**
   * Simulates an upload process, emitting progress every 300ms until it reaches 100
   */
  public mockUpload(): Observable<number> {
    const total = 100;
    let progress = 0;

    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        progress += 10;
        observer.next(progress);
        if (progress >= total) {
          clearInterval(interval);
          observer.complete();
        }
      }, 300);

      // -->Cleanup: stop interval if unsubscribed
      return () => clearInterval(interval);
    });
  }
}
