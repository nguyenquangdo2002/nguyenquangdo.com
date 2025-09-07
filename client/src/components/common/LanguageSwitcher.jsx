import { useTranslation } from 'react-i18next';

import React from 'react'
import { Button } from '../ui/button';

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }
    return (
        <div>
            <Button onClick={() => changeLanguage("en")}>EN</Button>
            <Button onClick={() => changeLanguage("vn")} >VN</Button>

        </div>
    )
}

export default LanguageSwitcher

