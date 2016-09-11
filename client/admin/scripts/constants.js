module.exports = {
    TOTAL_ROW: 16,
    API: {
        SIGN_IN:                "/api/signin_employer",
        CREATE_EMPLOYER:        "/api/create_employer",
        GET_ME:                 "/api/get_me",
        GET_ALL_USER:           "/api/all_employer",
        GET_USER_BY_ID:         "/api/get_employer_by_id",
        UPDATE_EMPLOYER_PHOTO:  "/api/upload_employer_photo",
        GET_MENU:               "/api/menu",
        CREATE_PRODUCT:         "/api/create_product",
        GET_LIST_PRODUCT:       "/api/get_list_product",
        GET_TOTAL_PRODUCT:      "/api/get_total_product",
        GET_PRODUCT:            "/api/get_product_by_id",
        UPDATE_PRODUCT:         "/api/update_product",
        DELETE_PRODUCT:         "/api/delete_product",
        GET_LIST_NEWS:          "/api/get_list_news",
        CREATE_NEWS:            "/api/create_news",
        GET_NEWS_BY_ID:         "/api/get_news_by_id",
        DELETE_NEWS:            "/api/delete_news",
        GET_TOTAL_NEWS:         "/api/get_total_news",
        GET_TOTAL_USERS:        "/api/get_total_users",
        RESET_PASSWORD:         "/api/reset_password_employer",
        CHANGE_STATUS_EMPLOYER: "/api/change_status_employer",
        UPDATE_USER_INFO:       "/api/update_employer_info",
        UPDATE_PASSWORD:        "/api/update_password_employer",
        CHANGE_SHOW_ON_TOP:     "/api/update_show_on_top",
        GET_LIST_TRADEMARK:     "/api/get_list_trademark",
        GET_TRADEMARK_BY_ID:    "/api/get_trademark_by_id",
        GET_LIST_TRADEMARK_MINI:"/api/get_list_trademark_mini",
        CREATE_TRADEMARK:       "/api/create_trademark",
        DELETE_TRADEMARK:       "/api/delete_trademark",
        UPDATE_TRADEMARK:       "/api/update_trademark",
        GET_GALLERY_BY_MENU_ID: "/api/get_gallery_by_menu_id", 
        ADD_MORE_PICTURE:       "/api/add_more_picture",
        GET_ALL_GALLERIES_MENU: "/api/get_all_gallery_menu",
        DELETE_GALLERY_MENU:    "/api/delete_gallery_menu",
        EDIT_GALLERY_MENU:      "/api/edit_gallery_menu",
        UPDATE_LOGO_CATEGORY:   "/api/update_logo_category",
        UPDATE_ROLE_EMPLOYER:   "/api/update_role_employer",
        FILTER_ORDER:           "/api/filter_order",
        GET_ORDER_BY_ID:        "/api/get_order_by_id",
        MARK_COMPLETED_ORDER:   "/api/mark_completed_order",
        SEARCH_PRODUCT:         "/api/search_product",
        CREATE_NEW_ORDER:       "/api/create_new_order",
        CANCEL_ORDER:           "/api/cancel_order",
    },
    ACTION: {
        SIGN_IN:                "SIGN_IN",
        CREATE_EMPLOYER:        "CREATE_EMPLOYER",
        GET_ALL_USER:           "GET_ALL_USER",
        SET_TOKEN:              "SET_TOKEN",
        LOG_OUT:                "LOG_OUT",
        GET_MENU:               "GET_MENU",
        CREATE_PRODUCT:         "CREATE_PRODUCT",
        GET_LIST_PRODUCT:       "GET_LIST_PRODUCT",
        GET_TOTAL_PRODUCT:      "GET_TOTAL_PRODUCT",
        GET_PRODUCT:            "GET_PRODUCT",
        UPDATE_PRODUCT:         "UPDATE_PRODUCT",
        DELETE_PRODUCT:         "DELETE_PRODUCT",
        GETTING_MENU:           "GETTING_MENU",
        GET_LIST_NEWS:          "GET_LIST_NEWS",
        CREATE_NEWS:            "CREATE_NEWS",
        GET_LIST_TRADEMARK:     "GET_LIST_TRADEMARK",
        TAB_SELECTED_DASHBOARD: "TAB_SELECTED_DASHBOARD",
        GET_LIST_TRADEMARK_MINI:"GET_LIST_TRADEMARK_MINI",
        UPDATE_LIST_ORDERS:     "UPDATE_LIST_ORDERS"
    }
}