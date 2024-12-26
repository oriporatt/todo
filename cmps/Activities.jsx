

export function Activities({activities}) {

    return (
        <ul className="activities-list">
            {activities.map(activity =>
                <li key={activity.at} >
                    <span>{activity.txt}</span>
                    <span>{activity.at}</span>
                </li>
            )}
        </ul>
    )
}

