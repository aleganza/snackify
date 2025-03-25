// Copyright 2019-2024 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello {name}, You have been greeted from Rust!")
}

fn main() {
    let context = tauri::generate_context!();

    tauri::Builder::default()
        .setup(|_app| {

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(context)
        .expect("error while running tauri application");
}
