export interface IModalConfirm {
    show?: boolean;
    data?: IModalData;
    width?: string;
}

export interface IModalData {
    title?: string;
    message?: string;
    buttonOk?: string;
    buttonCancel?: string;
}
