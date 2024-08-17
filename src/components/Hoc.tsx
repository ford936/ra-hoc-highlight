import "./Hoc.css"
import { useState } from 'react';


type ItemProps = {
    type: string;
    title?: string;
    url?: string;
    views: number;
}

function withPopularity(Component: React.ComponentType<ItemProps>) {
    return function(props: ItemProps) {
        if (props.views >= 1000) {
            return <Popular><Component {...props} /></Popular>;
        } else if (props.views < 100) {
            return <New><Component {...props} /></New>;
        } else {
            return <Component {...props}/>
        }
    }
}

const VideoWithPopularity = withPopularity(Video);
const ArticleWithPopularity = withPopularity(Article);

function New(props: { children: React.ReactNode }) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
}

function Popular(props: { children: React.ReactNode }) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
}

function Article(props: ItemProps) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
}

function Video(props: ItemProps) {
    return (
        <div className="item item-video">
            <iframe src={props.url} allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
}

function List(props: { list: ItemProps[] }) {
    return props.list.map((item, index) => {
        switch (item.type) {
            case 'video':
                return (
                    <VideoWithPopularity key={index} {...item} />
                );

            case 'article':
                return (
                    <ArticleWithPopularity key={index} {...item} />
                );
        }
    });
}

export default function Hoc() {
    const [list] = useState<ItemProps[]>([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}