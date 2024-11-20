package com.asm.asm3.Models;

public enum DeliveryStatus {
    CHUA_XET_DUYET("Chưa xét duyệt"),
    CHO_GIAO_HANG("Chờ giao hàng"),
    DANG_GIAO_HANG("Đang giao hàng"),
    DANG_GIAO_HANG_LAN_2("Đang giao hàng lần 2"),
    GIAO_HANG_THANH_CONG("Giao hàng thành công"),
    DA_HUY("Đã hủy");

    private final String status;

    DeliveryStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
