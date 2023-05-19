import { IEvent } from 'rca/models/event';
import { IGallery } from 'rca/models/gallery';
import { IUser } from 'rca/models/user';
import { atom } from 'recoil';
import { INotice } from "rca/models/notice";
import { ITestCenter } from "rca/models/testCenter";

export const usersAtom = atom<Array<Partial<IUser>>>({
  key: 'users',
  default: [],
});

export const eventsAtom = atom<Array<Partial<IEvent>>>({
  key: 'events',
  default: [],
});

export const galleryAtom = atom<Array<Partial<IGallery>>>({
  key: 'gallery',
  default: [],
});

export const noticeAtom = atom<Array<Partial<INotice>>>({
    key: 'notice',
    default: [],
});

export const testCenterAtom = atom<Array<Partial<ITestCenter>>>({
    key: 'testCenter',
    default: [],
});

export interface IUi {
  isMobile: boolean;
}

export const uiAtom = atom<IUi>({
  key: 'ui',
  default: {
    isMobile: true,
  },
});
