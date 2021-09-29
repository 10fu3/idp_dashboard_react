import {JsonAdminService, JsonAdminServiceList, JsonLinkedService} from "../Service";

export const TestServiceList: JsonAdminServiceList[] = [{
    service_id: "715ba7f9-da79-4685-bae3-9d1fe828a98d",
    service_name: "サービス1",
    icon_url: "https://next.material-ui.com/static/logo_raw.svg"
}, {
    service_id: "58c5eaef-28f8-4312-a7f0-b86873ae8c77",
    service_name: "サービス2",
    icon_url: "https://nabelog.org/wp-content/uploads/2020/09/ReactIcon.png"
}, {
    service_id: "de36e4c5-056d-42cf-a63c-66ea3f3e50a3",
    service_name: "サービス3",
    icon_url: "https://ja.wolframalpha.com/_next/static/images/share_3G6HuGr6.png"
}]

export const TestLinkedServiceJSON: JsonLinkedService[] = [
    {
        service_id: '715ba7f9-da79-4685-bae3-9d1fe828a98d',
        service_name: 'テスト1',
        icon_url: 'https://jp.vuejs.org/images/logo.svg',
        permissions: [
            'read_uuid',
            'read_profile'
        ]
    }, {
        service_id: '58c5eaef-28f8-4312-a7f0-b86873ae8c77',
        service_name: 'テスト2',
        icon_url: 'https://icons-for-free.com/iconfiles/png/512/design+development+facebook+framework+mobile+react+icon-1320165723839064798.png',
        permissions: [
            'read_uuid',
            'read_profile',
            'read_mail'
        ]
    }
]

export const TestServiceJSON: JsonAdminService[] = [{
    admin_id: '9dced394-af76-4493-a4d5-00109fe64a64',
    client_id: '',
    service_secret: 'f0d59804-e7cc-4f72-95ed-42619f466cb1cb2c58e5-f442-4010-a091-6d69f6ea0d9b',
    service_name: 'サービス1',
    service_id: '715ba7f9-da79-4685-bae3-9d1fe828a98d',
    redirect_uri: 'https://test.com',
    icon_url: 'https://next.material-ui.com/static/logo_raw.svg',
    description: 'てすとで〜す',
    permissions: [
        'read_uuid',
        'read_profile'
    ]
}, {
    client_id: '',
    admin_id: 'bb497007-0df6-4d39-864e-9329b355f596',
    service_secret: 'f0d59804-e7cc-4f72-95ed-42619f466cb1cb2c58e5-f442-4010-a091-6d69f6ea0d9b',
    service_name: 'サービス2',
    service_id: '58c5eaef-28f8-4312-a7f0-b86873ae8c77',
    redirect_uri: 'https://test1.com',
    icon_url: 'https://ja.wolframalpha.com/_next/static/images/share_3G6HuGr6.png',
    description: 'てすとぉ〜？',
    permissions: [
        'read_uuid'
    ]
}, {
    admin_id: '93dab8d4-372f-4963-be94-f77cc8398e64',
    client_id: '',
    service_secret: 'f0d59804-e7cc-4f72-95ed-42619f466cb1cb2c58e5-f442-4010-a091-6d69f6ea0d9b',
    service_name: 'サービス3',
    service_id: 'de36e4c5-056d-42cf-a63c-66ea3f3e50a3',
    redirect_uri: 'https://test2.com',
    icon_url: 'https://jp.vuejs.org/images/logo.svg',
    description: 'むふふ',
    permissions: [
        'read_uuid',
        'read_profile',
        'read_mail'
    ]
}]
