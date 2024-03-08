import { json } from "@sveltejs/kit"

export function GET() {
    const data = {
        "projects": [
            {
                "id": 0,
                "title": {"pt": "Billy Mentoria", "en": "Billy Mentory",},
                "technologies": [""],
                "codeUrl": "",
                "liveUrl": "",
                "images": [
                    "https://ik.imagekit.io/ncfh58vi7c/Vivaldi%20Captures/tr:q-80/billy-mentoria.png?updatedAt=1709863198646"
                ]
            },
            {
                "id": 1,
                "title": {"pt": "Porocode Sistema de Admin", "en": "Porocode Admin System",},
                "technologies": [""],
                "codeUrl": "",
                "liveUrl": "",
                "images": [
                    "https://ik.imagekit.io/ncfh58vi7c/Vivaldi%20Captures/tr:q-80/porocode-admin-system-2.png?updatedAt=1709863200237"
                ]
            },
            {
                "id": 2,
                "title": {"pt": "South Tech", "en": "South Tech",},
                "technologies": [""],
                "codeUrl": "",
                "liveUrl": "",
                "images": [
                    "https://ik.imagekit.io/ncfh58vi7c/Vivaldi%20Captures/tr:q-80/south-tech-1.png?updatedAt=1709863199151"
                ]
            },
            {
                "id": 3,
                "title": {"pt": "Isaque Designer", "en": "Isaque Designer",},
                "technologies": [""],
                "codeUrl": "",
                "liveUrl": "",
                "images": [
                    "https://ik.imagekit.io/ncfh58vi7c/Vivaldi%20Captures/tr:q-80/isaque-designer.png?updatedAt=1709863198242"
                ]
            },
            {
                "id": 4,
                "title": {"pt": "interactive card desstails form", "en": "interactive card details form",},
                "technologies": [""],
                "codeUrl": "",
                "liveUrl": "",
                "images": [
                    "https://ik.imagekit.io/ncfh58vi7c/Vivaldi%20Captures/tr:q-80/interactive-card-details-form.png?updatedAt=1709863198296"
                ]
            },
        ]
    }

    return json(data)
}