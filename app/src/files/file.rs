// Copyright 2023 Databend Labs
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

use std::fs;
use std::time::SystemTime;

use anyhow::Result;
use walkdir::WalkDir;

#[derive(Clone, Debug)]
pub struct FileMeta {
    pub dir: String,
    pub file_name: String,
    pub full_path: String,
    pub modified: SystemTime,
}

pub struct FileOperator {
    data_path: String,
}

impl FileOperator {
    pub fn create(data_path: &str) -> Self {
        FileOperator {
            data_path: data_path.to_string(),
        }
    }

    /// Get all files meta of the data path.
    pub fn list(&self) -> Result<Vec<FileMeta>> {
        let mut metas = vec![];

        for entry in WalkDir::new(self.data_path.clone()) {
            let entry = entry?;

            let path = entry.path();
            let file_name = entry.file_name().to_string_lossy().to_string();
            let metadata = fs::metadata(path)?;

            if !metadata.is_dir() && path.extension().map_or(false, |ext| ext == "md") {
                let parent = path.parent().map(|p| p.to_string_lossy().into_owned());
                let full_path = path.to_string_lossy().to_string();
                let modified = metadata.modified()?;

                metas.push(FileMeta {
                    dir: parent.unwrap_or_default(),
                    file_name,
                    full_path,
                    modified,
                });
            }
        }

        Ok(metas)
    }
}