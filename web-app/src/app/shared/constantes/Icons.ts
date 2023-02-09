import { BTN_TYPES } from '@shared/constantes/Constante';

export const Icons = {
    details: {
        ref: 'detailsBtn',
        handler: 'openDetails',
        type: BTN_TYPES.BTN_ICON, // 'icon' | 'flat'
        name: 'info_outline',
        style: 'color: #0daef9',
    },
    edit: {
        ref: 'editBtn',
        handler: 'onEdit',
        type: BTN_TYPES.BTN_ICON, // 'icon' | 'flat'
        name: 'edit',
        style: 'color: #19c8a6',
    },
    delete: {
        ref: 'deleteBtn',
        handler: 'onDelete',
        type: BTN_TYPES.BTN_ICON, // 'icon' | 'flat'
        name: 'delete_outline',
        style: 'color: #e64d42',
    },
    download: {
        ref: 'downloadBtn',
        handler: 'onDownload',
        type: BTN_TYPES.BTN_ICON, // 'icon' | 'flat'
        name: 'file_download_outline',
        style: 'color: #28a745',
    },
    eye: {
        ref: 'eyeBtn',
        handler: 'openView',
        type: BTN_TYPES.BTN_ICON, // 'icon' | 'flat'
        name: 'visibility',
        style: 'color: #0daef9',
    },
    openImage: {
        ref: 'openImageBtn',
        handler: 'openImage',
        type: BTN_TYPES.BTN_ICON, // 'icon' | 'flat'
        name: 'image_search',
        style: 'color: #1681b3',
    },
    openIn: {
        ref: 'openInBtn',
        handler: 'onOpenIn',
        type: BTN_TYPES.BTN_ICON, // 'icon' | 'flat'
        name: 'open_in_new',
        style: 'color: #1681b3',
    },
  camera: {
      ref: 'viewCameraBtn',
      handler: 'openCamera',
      type: BTN_TYPES.BTN_ICON, // 'icon' | 'flat'
      name: 'videocam',
      style: 'color: #1681b3',
  }
}

export const Buttons = {
    outlineBtn: {
        ref: 'outlineBtn',
        handler: 'onOutlineBtn',
        type: BTN_TYPES.BTN_FLAT, // 'icon' | 'flat'
        txt: '',
        key: '', // key: {ar: '', fr: '', en: ''}
        icon: {
            name: '',
            style: 'color: #1681b3',
        },
        style: ''
    }
}
