import { ChangeDetectorRef } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";

/**
 * @see https://betterprogramming.pub/how-to-write-tests-for-components-with-onpush-change-detection-in-angular-24f2637a0f40
 * Changes in components using OnPush strategy are only applied once when calling .detectChanges(),
 * This function solves this issue.
 * @since 2021-06-30: 添加泛型支持
 */
 export async function runOnPushChangeDetection<T>(fixture: ComponentFixture<T>): Promise<void> {
  const changeDetectorRef = fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
  changeDetectorRef.detectChanges();
  return fixture.whenStable();
}
