package com.asm.asm3.Models;

public enum PaymentStatus {
    CHO_THANH_TOAN_ATM("Chờ thanh toán ATM"),
    CHUA_THANH_TOAN("Chưa thanh toán"),
    DA_THANH_TOAN("Đã thanh toán"),
    DA_HOAN_TIEN("Đã hoàn tiền"),
    DA_HUY_BO("Đã hủy bỏ");

    private final String status;

    PaymentStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
