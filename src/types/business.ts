export interface BusinessOwnerObject {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
}

export interface BusinessAttributes {
    name: string;
    type: {
        code: string;
        label: string;
    };
    status: {
        code: 'active' | 'inactive';
        label: string;
    };
    owner: BusinessOwnerObject;
    created_at: string;
    updated_at?: string;
}

export interface Business {
    id: string;
    type: string;
    attributes: BusinessAttributes;
}
