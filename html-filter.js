// SPDX-FileCopyrightText: (c) 2024 CERN
// SPDX-License-Identifier: MPL-2.0
// Author: Axel Naumann axel@cern.ch

// 
//
//
// Configuration.

// These are the options that will be displayed in the filter rows.
// The first one is the default.
const hf_options = {
    "Release": ['Latest Stable', 'Nightly'],
    "Your OS": ['Fedora/RHEL/Alma', 'Ubuntu/Debian', 'macOS'],
    "Your Arch": ['x86_64', 'arm64'],
    "Method": ['Binaries', 'Conda', 'Source']
};

// If a combination of options should be vetoed, add it here, like such:
// hf_veto = [[0, 1, 1, 0], [1, 2, 1, 1]];
const hf_veto = []

// Whether any of the hf_options allows for multiple selections. TODO: implement.
//const hf_allow_multiple = [false, false, false, false];

const hf_results = {
    "Latest Stable": {
        "Fedora/RHEL/Alma": {
            "x86_64": {
                "Binaries": "```\
wget https://root.cern/download/root_v6.34.06.Linux-fedora33-x86_64-gcc10.tar.gz\
tar -xzf root_v6.34.06.Linux-fedora33-x86_64-gcc10.tar.gz\
source root/bin/thisroot.sh\
```",
                "Conda": "```\
conda config --set channel_priority strict\
$ conda create -c conda-forge --name <my-environment> root\
$ conda activate <my-environment>\
```",
                "Source": "https://hg.mozilla.org/mozilla-central"
            },
            "arm64": {
                "Binaries": "https://download.mozilla.org/?product=firefox-latest-ssl&os=linux-aarch64&lang=en-US",
                "Conda": "https://anaconda.org/conda-forge/firefox",
                "Source": "https://hg.mozilla.org/mozilla-central"
            }
        },
        "Ubuntu/Debian": {
            "x86_64": {
                "Binaries": "https://download.mozilla.org/?product=firefox-latest-ssl&os=linux64&lang=en-US",
                "Conda": "https://anaconda.org/conda-forge/firefox",
                "Source": "https://hg.mozilla.org/mozilla-central"
            },
            "arm64": {
                "Binaries": "https://download.mozilla.org/?product=firefox-latest-ssl&os=linux-aarch64&lang=en-US",
                "Conda": "https://anaconda.org/conda-forge/firefox",
                "Source": "https://hg.mozilla.org/mozilla-central"
            }
        },
        "macOS": {
            "x86_64": {
                "Binaries": "https://download.mozilla.org/?product=firefox-latest-ssl&os=osx&lang=en-US",
                "Conda": "https://anaconda.org/conda-forge/firefox",
                "Source": "https://hg.mozilla.org/mozilla-central"
            }
        }
    },
    "Nightly": {
        "Fedora/RHEL/Alma": {
            "x86_64": {
                "Binaries": "https://download.mozilla.org/?product=firefox-nightly-latest-ssl&os=linux64&lang=en-US",
                "Conda": "https://anaconda.org/conda-forge/firefox-nightly",
                "Source": "https://hg.mozilla.org/mozilla-central"
            }
        }
    }
};

const hf_result_default = "I don't have that information. Please try again with different options.";

//
//
//
// Implementation.

window.onload = hf_inject;

// Inject the filter into the page.
function hf_inject() {
    hf_filter = "<table>";
    let i = 0;
    for (const [key, value] of Object.entries(hf_options)) {
        i = i++;
        hf_filter += '<tr><th scope="row">' + key + '</th><td>';
        for (let j = 0; j < value.length; ++j) {
            hf_filter += '<input type="radio" id="hf_select_' + i + '_' + j + '" name="hd_select_' + i + '" onchange="hf_filter()"/><label for="hf_select_' + i + '_' + j + '">' + value[j] + '</label>';
        }
        hf_filter += '</td></tr>';
    }
    hf_filter += "</table>";
    document.getElementById('hf-filter').innerHTML = hf_filter;
}
function hf_filter() {
    /*
    const opts = Array(hf_options.length);
    for (let i = 0; i < hf_options.length; ++i) {
        const select = document.getElementById("hf_select_" + i);
        opts[i] = select.options[select.selectedIndex].text;
    }

    for (let i = 0; i < hf_veto.length; ++i) {
        let veto = true;
        for (let j = 0; j < hf_veto[i].length; ++j) {
            if (hf_veto[i][j] !== opts[j]) {
                veto = false;
                break;
            }
        }
        if (veto) {
            document.getElementById("hf_result").innerHTML = hf_result_default;
            return;
        }
    }

    const result = hf_results[opts[0]][opts[1]][opts[2]][opts[3]];
    document.getElementById("hf_result").innerHTML = result;
    */
}