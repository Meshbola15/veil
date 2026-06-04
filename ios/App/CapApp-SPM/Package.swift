// swift-tools-version: 5.9
import PackageDescription

// DO NOT MODIFY THIS FILE - managed by Capacitor CLI commands
let package = Package(
    name: "CapApp-SPM",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "CapApp-SPM",
            targets: ["CapApp-SPM"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", exact: "8.3.4"),
        .package(name: "CapacitorBarcodeScanner", path: "../../../node_modules/.pnpm/@capacitor+barcode-scanner@3.0.2_@capacitor+core@8.3.4/node_modules/@capacitor/barcode-scanner"),
        .package(name: "CapacitorBrowser", path: "../../../node_modules/.pnpm/@capacitor+browser@8.0.3_@capacitor+core@8.3.4/node_modules/@capacitor/browser"),
        .package(name: "CapacitorCamera", path: "../../../node_modules/.pnpm/@capacitor+camera@8.2.0_@capacitor+core@8.3.4/node_modules/@capacitor/camera"),
        .package(name: "CapacitorHaptics", path: "../../../node_modules/.pnpm/@capacitor+haptics@8.0.2_@capacitor+core@8.3.4/node_modules/@capacitor/haptics"),
        .package(name: "CapacitorStatusBar", path: "../../../node_modules/.pnpm/@capacitor+status-bar@8.0.2_@capacitor+core@8.3.4/node_modules/@capacitor/status-bar"),
        .package(name: "CapawesomeCapacitorTorch", path: "../../../node_modules/.pnpm/@capawesome+capacitor-torch@8.0.1_@capacitor+core@8.3.4/node_modules/@capawesome/capacitor-torch"),
        .package(name: "CapacitorPluginSafeArea", path: "../../../node_modules/.pnpm/capacitor-plugin-safe-area@5.0.0_@capacitor+core@8.3.4/node_modules/capacitor-plugin-safe-area")
    ],
    targets: [
        .target(
            name: "CapApp-SPM",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                .product(name: "CapacitorBarcodeScanner", package: "CapacitorBarcodeScanner"),
                .product(name: "CapacitorBrowser", package: "CapacitorBrowser"),
                .product(name: "CapacitorCamera", package: "CapacitorCamera"),
                .product(name: "CapacitorHaptics", package: "CapacitorHaptics"),
                .product(name: "CapacitorStatusBar", package: "CapacitorStatusBar"),
                .product(name: "CapawesomeCapacitorTorch", package: "CapawesomeCapacitorTorch"),
                .product(name: "CapacitorPluginSafeArea", package: "CapacitorPluginSafeArea")
            ]
        )
    ]
)
