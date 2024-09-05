import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private messageService: MessageService,
  ) { }

  openToast(type: any, details: any, key?: any, clearAll?: boolean): void {
    if (clearAll) {
      this.clearAllToasts();
    }
    this.messageService.add({ severity: type, detail: details, icon: type == 'success' ? 'pi-check fs-5 mt-1' : 'pi-info-circle fs-5 mt-1', key: key, sticky: false });
  }
  clearAllToasts(): void {
    this.messageService.clear();
  }

}
