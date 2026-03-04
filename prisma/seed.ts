import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import { PrismaClient, type InfoSection, type ProjectCategory } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set.");
}

const prisma = new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url: databaseUrl }),
});

const techStack = [
    "TypeScript",
    "JavaScript",
    "PHP",
    "Python",
    "Golang",
    "React.js / Next.js",
    "Node.js / Bun",
    "Docker",
    "Laravel",
    "CodeIgniter",
];

const workExperiences = [
    {
        title: "IT Staff - Fullstack Web Developer",
        company: "Bina Insani University",
        location: "Bekasi",
        period: "Mar 2025 - Present",
        highlights: [
            "Maintenance and refacotoring of existing web applications.",
            "Development of new web applications.",
            "Maintenance and securing security of server infrastructure.",
            "Monitoring and trouble shooting of running systems",
        ],
    },
];

const projects: Array<{
    category: ProjectCategory;
    title: string;
    description: string;
    image: string;
    repoHref?: string;
    repoApi?: string;
    demoHref?: string;
    technologies: string[];
    features: string[];
}> = [
    {
        category: "web",
        title: "KIP Kuliah Bina Insani University",
        description:
            "KIP Kuliah Bina Insani University is an official online registration website for the KIP-Kuliah scholarship program at Bina Insani University.",
        image: "/assets/images/portfolio/kipk.png",
        demoHref: "https://kipk.binainsani.ac.id/",
        technologies: ["React.js", "Vite", "Express.js", "MongoDB", "RabbitMQ", "Tailwind", "Docker"],
        features: ["Online Registration", "Realtime Notification", "Registrasion Status Tracking", "Message Queue Management`"],
    },
    {
        category: "web",
        title: "PMB Bina Insani University",
        description:
            "PMB Bina Insani University is an official online registration website for the new student admission at Bina Insani University.",
        image: "/assets/images/portfolio/pmb.png",
        demoHref: "https://penerimaan.binainsani.ac.id/pmb-biu",
        technologies: ["CodeIgniter 3", "PHP", "MySQL", "Bootstrap", "jQuery", "HTML", "JavaScript", "CSS", "AJAX", "Docker"],
        features: ["Online Registration", "Realtime Notification", "Registrasion Status Tracking"],
    },
    {
        category: "ai",
        title: "Chatbot Konseling",
        description: "Chatbot konseling is a chatbot that provides counseling services to students at Bina Insani University.",
        image: "/assets/images/portfolio/chatbot.png",
        demoHref: "https://kemahasiswaan.binainsani.ac.id/",
        technologies: ["Python", "Javascript", "Node.js", "PostgreSQL", "React.js", "Docker", "Tailwind"],
        features: [
            "Identify and provide counseling services to students",
            "Provide counseling services to students",
            "Schedule counseling sessions",
        ],
    },
];

const infoEntries: Array<{
    section: InfoSection;
    groupTitle: string;
    groupIcon: string;
    title: string;
    subtitle: string;
    period: string;
    groupOrder: number;
    sortOrder: number;
}> = [
    {
        section: "education",
        groupTitle: "Education",
        groupIcon: "FaUserGraduate",
        title: "Bachelor of Informatics Engineering (S.Kom)",
        subtitle: "Bina Insani Univeristy - Bekasi",
        period: "Jul 2021 - Okt 2025 (GPA: 3.93)",
        groupOrder: 0,
        sortOrder: 0,
    },
    {
        section: "education",
        groupTitle: "Bootcamp",
        groupIcon: "FaLaptopCode",
        title: "SIB Dicoding X Kampus Merdeka Cycle 6",
        subtitle: "Web Front-End and Back-End Developer",
        period: "Feb - Jun 2024",
        groupOrder: 1,
        sortOrder: 0,
    },
    {
        section: "organization",
        groupTitle: "Organization",
        groupIcon: "FaUsers",
        title: "Head of Computer Club",
        subtitle: "Unit Kegiatan Mahasiswa (UKM) Bina Insani University",
        period: "Sep 2024 - Feb 2025",
        groupOrder: 0,
        sortOrder: 0,
    },
    {
        section: "organization",
        groupTitle: "Organization",
        groupIcon: "FaUsers",
        title: "Vice Chairman of Kominfo division",
        subtitle: "Student Executive Board (BEM) Bina Insani University",
        period: "2024",
        groupOrder: 0,
        sortOrder: 1,
    },
    {
        section: "award",
        groupTitle: "Award",
        groupIcon: "FaAward",
        title: "Best Student in Informatics Engineering",
        subtitle: "Issued by Bina Insani University",
        period: "Okt 2025",
        groupOrder: 0,
        sortOrder: 0,
    },
    {
        section: "award",
        groupTitle: "Award",
        groupIcon: "FaAward",
        title: "Runner Up for IOT Category Indoneris National IT Competition",
        subtitle: "Issued by Amikom Purwokerto",
        period: "Des 2024",
        groupOrder: 0,
        sortOrder: 1,
    },
    {
        section: "award",
        groupTitle: "Award",
        groupIcon: "FaAward",
        title: "Best graduate in SIB Dicoding X Kampus Merdeka Cycle 6",
        subtitle: "Issued by Dicoding Indonesia",
        period: "Jun 2024",
        groupOrder: 0,
        sortOrder: 2,
    },
    {
        section: "award",
        groupTitle: "Award",
        groupIcon: "FaAward",
        title: "Best Student in Motorcycle Engineering",
        subtitle: "Issued by SMK Negeri 2 Bekasi",
        period: "Okt 2021",
        groupOrder: 0,
        sortOrder: 2,
    },
    {
        section: "award",
        groupTitle: "Committee",
        groupIcon: "FaUsers",
        title: "Fasilitator Program",
        subtitle: "IDCamp 2025 by Dicoding Indonesia",
        period: "Feb 2026",
        groupOrder: 1,
        sortOrder: 0,
    },
];

async function main() {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "admin12345", 10);

    await prisma.adminUser.upsert({
        where: { email: process.env.ADMIN_EMAIL ?? "admin@putrodwi.my.id" },
        update: {
            name: "Putro Admin",
            passwordHash,
        },
        create: {
            email: process.env.ADMIN_EMAIL ?? "admin@putrodwi.my.id",
            name: "Putro Admin",
            passwordHash,
        },
    });

    await prisma.siteSetting.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            siteTitle: "Portfolio Putro Dwi Mulyo",
            siteDescription: "Portfolio profesional Putro Dwi Mulyo. Temukan proyek web development dan cloud computing.",
            heroBadge: "Available for Opportunities",
            heroName: "Putro",
            heroRole: "IT Enthusiast.",
            heroDescription: "Welcome to my portfolio. Feel free to explore my work and reach out if you'd like to discuss anything.",
            aboutDescription:
                "Informatics engineering graduate with a proven track record in leading website development projects and active involvement in organizational initiatives. Skilled in team leadership, web development (Typescript, PHP, JavaScript frameworks & Golang). Passionate about leveraging technical expertise to drive innovative projects.",
            resumeUrl: "/assets/pdf/mycv.pdf",
            githubUrl: "https://github.com/putrodwi31",
            linkedinUrl: "https://www.linkedin.com/in/putrodwi31/",
            instagramUrl: "https://www.instagram.com/putrodwi31/",
            contactTitle: "Let's Work Together",
            contactDescription: "Have an interesting project or just want to discuss technology?\nDon't hesitate to contact me.",
        },
    });

    await prisma.techStackItem.deleteMany();
    await prisma.workHighlight.deleteMany();
    await prisma.workExperience.deleteMany();
    await prisma.projectFeature.deleteMany();
    await prisma.projectTech.deleteMany();
    await prisma.project.deleteMany();
    await prisma.infoEntry.deleteMany();

    await prisma.techStackItem.createMany({
        data: techStack.map((name, index) => ({ name, sortOrder: index })),
    });

    for (const [index, experience] of workExperiences.entries()) {
        await prisma.workExperience.create({
            data: {
                title: experience.title,
                company: experience.company,
                location: experience.location,
                period: experience.period,
                sortOrder: index,
                highlights: {
                    create: experience.highlights.map((text, highlightIndex) => ({
                        text,
                        sortOrder: highlightIndex,
                    })),
                },
            },
        });
    }

    for (const [index, project] of projects.entries()) {
        await prisma.project.create({
            data: {
                category: project.category,
                title: project.title,
                description: project.description,
                image: project.image,
                repoHref: project.repoHref,
                repoApi: project.repoApi,
                demoHref: project.demoHref,
                sortOrder: index,
                technologies: {
                    create: project.technologies.map((name, techIndex) => ({
                        name,
                        sortOrder: techIndex,
                    })),
                },
                features: {
                    create: project.features.map((text, featureIndex) => ({
                        text,
                        sortOrder: featureIndex,
                    })),
                },
            },
        });
    }

    await prisma.infoEntry.createMany({
        data: infoEntries,
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });
