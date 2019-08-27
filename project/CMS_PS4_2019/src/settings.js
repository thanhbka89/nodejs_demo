export class UserSetting {
  // Phan loai Khach hang
  static TYPE_DIAMOND = 1
  static TYPE_VIP = 2
  static TYPE_LOYAL = 3

  // Role
  static ROLE_ADMINISTRATOR = 1  // Quan tri
  static ROLE_EMPLOYEE = 2  // Nhan vien
  static ROLE_MEMBER = 3  // Khach hang

}

export class CheckOutSetting {
  // Tich diem %
  static HAS_POINT = true   // Co|khong ap dung tich diem
  static POINT_EARN = 5     // % diem tich cho moi giao dich

  // Chiet khau, discount cho thanh vien VIP : %
  static HAS_DISCOUNT = true   // Co|khong ap dung chiet khau
  static SELECT_TYPE_DISCOUNT = 2  // Chon hinh thuc chiet khau
  static TYPE_DISCOUNT_ALL = 1  // Tat ca cac mat hang
  static TYPE_DISCOUNT_PS = 2   // Chi ap dung cho gio choi
  static DISCOUNT_DIAMOND = 30  // % discount cho KH Diamond
  static DISCOUNT_VIP = 20      // % discount cho KH VIP
  static DISCOUNT_LOYAL = 0     // % discount cho KH than thiet
}

export class CommonSetting {
  // Danh muc
  static CATEGORY_DRINK = 1 // Nuoc uong
  static CATEGORY_EAT = 2 // Do an
  static CATEGORY_PS = 3 // PS
  static CATEGORY_OTHER = 4 // Khac

  // Trang thai
  static STATUS_INACTIVE = 0 // Khong Ap dung
  static STATUS_ACTIVE = 1 // Ap dung
}

