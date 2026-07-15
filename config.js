const SITE_CONFIG = {
    // ----------------------------------------------------
    // 1. GLOBAL BRANDING & LOGOS
    // ----------------------------------------------------
    branding: {
        brandName: "VEXORI",
        copyrightText: "© 2026 VEXORI ARCHIVE. ALL RIGHTS RESERVED.",
        logoImageSrc: "logo.png" // Client can change this to their logo filename
    },

    // ----------------------------------------------------
    // 2. ANIMATED IMAGE SEQUENCES
    // ----------------------------------------------------
    sequences: {
        hero: {
            folder: "ss", // The folder containing the first scroll animation
            startFrame: 2, // e.g., 02.png
            frameCount: 41 // Total number of frames in the sequence
        },
        secondary: {
            folder: "mm", // The folder containing the second scroll animation
            startFrame: 1, // e.g., 01.png
            frameCount: 40 // Total number of frames in the sequence
        }
    },

    // ----------------------------------------------------
    // 3. COPY & TEXT CONTENT
    // ----------------------------------------------------
    heroSection: {
        watermarkLeft: "VEX",
        watermarkRight: "ORI",
        overlayTitle: "ARCHIVE 01",
        overlaySubtitle: "OUTERWEAR EVOLVED"
    },

    editorialSection: {
        title: "THE<br>SILHOUETTE<br>REDEFINED.",
        bodyText: "Our inaugural collection strips away the excess, focusing entirely on structural integrity and the interaction between premium materials and the human form.",
        buttonText: "EXPLORE ARCHIVE",
        materialTitle: "MATERIAL STUDY",
        materialText: "Heavyweight 500gsm French Terry. Milled to exact specifications for enduring structure."
    },

    marquee: {
        text: "VEXORI • ARCHIVE 01 • THE COLLECTION •"
    },

    secondarySequenceSection: {
        subtitle: "PRECISION CRAFTED",
        title: "Every Stitch<br>Considered."
    },

    collectionSection: {
        title: "THE ARCHIVE COLLECTION",
        subtitle: "Secure your piece of the inaugural outerwear evolution."
    },

    // ----------------------------------------------------
    // 4. PRODUCTS
    // ----------------------------------------------------
    // You can easily add, remove, or modify the products here.
    products: [
        {
            image: "prod1.jpg",
            title: "Burgundy Hoodie",
            price: 120,
            sizes: "XS / S / M / L / XL"
        },
        {
            image: "prod2.jpg",
            title: "Navy Blue Hoodie",
            price: 120,
            sizes: "XS / S / M / L / XL"
        },
        {
            image: "prod3.jpg",
            title: "Midnight Black Hoodie",
            price: 135,
            sizes: "XS / S / M / L / XL"
        },
        {
            image: "prod4.jpg",
            title: "Forest Green Hoodie",
            price: 120,
            sizes: "XS / S / M / L / XL"
        }
    ],

    // ----------------------------------------------------
    // 5. SIDEBAR INFO DRAWER
    // ----------------------------------------------------
    infoDrawer: {
        title: "ABOUT VEXORI",
        leadText: "Founded in 2026, Vexori redefines the silhouette through premium materials and structural integrity.",
        blocks: [
            {
                title: "PHILOSOPHY",
                text: "We strip away the excess. Every stitch, every fiber is considered. We engineer outerwear that serves as armor against the elements while maintaining uncompromising luxury."
            },
            {
                title: "FLAGSHIP STUDIO",
                text: "404 Archive District<br>Neo-Tokyo, JP 150-0041"
            },
            {
                title: "CONTACT",
                text: "atelier@vexori.com<br>+81 3-5555-0199"
            }
        ]
    },

    // ----------------------------------------------------
    // 6. FOOTER MODALS (Terms, Privacy, etc.)
    // ----------------------------------------------------
    footerModals: {
        PRIVACY: `
            <h4>1. DATA COLLECTION</h4>
            <p>Vexori maintains strict confidentiality regarding all client data. We collect only what is necessary to process your transactions and deliver your archive pieces.</p>
            <h4>2. SECURITY</h4>
            <p>All transactions are encrypted using state-of-the-art security protocols. Your payment information is never stored on our direct servers.</p>
            <h4>3. COOKIES</h4>
            <p>We use essential cookies to maintain your session and cart data. We do not participate in third-party data brokering.</p>
        `,
        TERMS: `
            <h4>1. ARCHIVE PURCHASES</h4>
            <p>All items from the Archive 01 collection are highly limited. Adding an item to your bag does not guarantee reservation until checkout is fully completed.</p>
            <h4>2. RETURNS & EXCHANGES</h4>
            <p>Due to the limited nature of our drops, we accept returns only for defective items within 7 days of delivery. Exchanges for sizing are subject to inventory availability.</p>
            <h4>3. INTELLECTUAL PROPERTY</h4>
            <p>All designs, imagery, and structural silhouettes are the exclusive property of Vexori. Unauthorized reproduction is strictly prohibited.</p>
        `,
        CAREERS: `
            <h4>JOIN THE ATELIER</h4>
            <p>Vexori is always looking for visionaries who understand structural integrity and luxury materials.</p>
            <h4>OPEN ROLES</h4>
            <p>- Senior Pattern Maker (Tokyo)<br>- Digital Experience Architect (Remote)<br>- Materials Sourcing Specialist (Milan)</p>
            <h4>APPLY</h4>
            <p>Send your portfolio and a brief statement of intent to <strong>careers@vexori.com</strong>.</p>
        `,
        CONTACT: `
            <h4>CLIENT CONCIERGE</h4>
            <p>For inquiries regarding your order, sizing advice, or general questions, our concierge team is available 24/7.</p>
            <h4>EMAIL</h4>
            <p>atelier@vexori.com</p>
            <h4>FLAGSHIP STUDIO</h4>
            <p>404 Archive District<br>Neo-Tokyo, JP 150-0041<br>+81 3-5555-0199</p>
        `
    }
};
