/* ==========================================
   Binary Findings Cookie Preferences
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------
    // Get page elements
    // --------------------------------------

    const banner = document.getElementById("cookie-banner");
    const modal = document.getElementById("cookie-modal");

    const acceptBanner = document.getElementById("accept-cookies");
    const manageButton = document.getElementById("manage-cookies");

    const acceptPreferences = document.getElementById("accept-preferences");
    const analyticsCheckbox = document.getElementById("analytics-consent");

    const footerLink = document.getElementById("cookie-preferences-link");


    // --------------------------------------
    // Restore saved preference
    // --------------------------------------

    const savedPreference = localStorage.getItem("bf_cookie_preferences");

    if (savedPreference) {

        const settings = JSON.parse(savedPreference);

        analyticsCheckbox.checked = settings.analytics;

        if (settings.analytics) {
            loadGoogleAnalytics();
        }

    } else {

        // No saved choice
        banner.classList.remove("hidden");

    }


    // --------------------------------------
    // Banner - Accept
    // --------------------------------------

    acceptBanner.addEventListener("click", () => {

        analyticsCheckbox.checked = true;

        savePreferences();

    });


    // --------------------------------------
    // Banner - Manage
    // --------------------------------------

    manageButton.addEventListener("click", () => {

        banner.classList.add("hidden");

        modal.classList.remove("hidden");

    });


    // --------------------------------------
    // Modal - Accept
    // --------------------------------------

    acceptPreferences.addEventListener("click", () => {

        savePreferences();

    });


    // --------------------------------------
    // Footer link
    // --------------------------------------

    if (footerLink) {

        footerLink.addEventListener("click", (e) => {

            e.preventDefault();

            modal.classList.remove("hidden");

        });

    }


    // --------------------------------------
    // Save user preference
    // --------------------------------------

    function savePreferences() {

        const preferences = {

            essential: true,

            analytics: analyticsCheckbox.checked

        };

        localStorage.setItem(

            "bf_cookie_preferences",

            JSON.stringify(preferences)

        );

        banner.classList.add("hidden");

        modal.classList.add("hidden");

        if (preferences.analytics) {

            loadGoogleAnalytics();

        }

    }

});


/* ==========================================
   Google Analytics
   Replace with your Measurement ID later
========================================== */

let analyticsLoaded = false;

function loadGoogleAnalytics() {

    if (analyticsLoaded) return;

    analyticsLoaded = true;

    const measurementID = "YOUR_MEASUREMENT_ID";

    const script = document.createElement("script");

    script.async = true;

    script.src =
        `https://www.googletagmanager.com/gtag/js?id=${measurementID}`;

    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    window.gtag = gtag;

    gtag("js", new Date());

    gtag("config", measurementID);

}