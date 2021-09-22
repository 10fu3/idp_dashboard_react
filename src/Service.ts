export type JsonService = {
    service_id: string
    service_name: string
    icon_url: string
    description: string
    permissions: string[]
}

export type JsonLinkedService = {
    service_id: string
    service_name: string
    icon_url: string
    permissions: string[]
}

export type JsonAdminServiceList = {
    service_name: string,
    service_id: string,
    icon_url: string
}

export type JsonAdminService = {
    admin_id: string
    service_name: string
    service_secret: string
    service_id: string
    redirect_uri: string
    icon_url: string
    description: string
    permissions: string[]
}
