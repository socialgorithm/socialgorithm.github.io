---
layout:     post
title:      "Ultimate TicTacToe supports Morgan Stanley's European Intern Challenge"
date:       2018-08-14
author:     "Socialgorithm"
header-img: "/img/blog/2018-08-14-intern-challenge/bracket.jpg"
categories: tech
event_date: 2018-08-03
event_location: Morgan Stanley HQ, Canary Wharf, London
event_abstract: Morgan Stanley used our Ultimate TicTacToe platform to run an internship challenge for 80 interns across London, Budapest and Glasgow.
---

Morgan Stanley used our Ultimate TicTacToe platform to run an internship challenge for 80 interns across London, Budapest and Glasgow.

--------------

At Socialgorithm, we love to complicate our lives by making huge changes to the architectures of applications that work just fine.

If you ask me to describe the development of our Ultimate TicTacToe platform so far, fire drill and spaghetti would be the words that come to mind. To be fair though, it has worked well so far, and things that have the quality of working are to be prized over architectures that never made it to production.

Still, There is wisdom in Bob Martin's idea of leaving campgrounds cleaner than you find them, and for a competition we provided our platform for a couple of weeks ago, our architecture needed a major overhaul.

## The Intern Challenge

A couple of months ago, we were approached to organise an AI challenge for Morgan Stanley's internship program. 80 bright interns, in teams of 4, across 3 geographic locations would develop algorithms over 1 month, in order to compete against each other in a final Ultimate TicTacToe battle. The asks:

1. Multiple Lobbies/Tournaments
  - This allows players to practice against their own and each other's algorithms in the weeks leading up to the competition
1. Double elimination mode
  - To give algorithms a second chance if they lost once
1. Manual Game Control
  - To get people cheering for the final showdowns
1. Tournament League/Bracket Visualisations
  - Because nobody ever looks at the backend

## Matchmakers

To support participants playing each other's algorithms to practice, rather than introduce a new tournament type, we decided to abstract this mode into the concept of a matchmaker, that tournaments could, based on the results of matches, periodically call to obtain new matches and rankings.

Lobbies can be then be configured for different game types, one of which is 1vs1. We knew we were on the right track when the competition organisers asked us to implement a double elimination league mode, which simply became an option for how to initialize a tournament.

## Re-architecting

{% include image.html url="/img/blog/2018-08-14-intern-challenge/structure-before.png" description="Before" %}

{% include image.html url="/img/blog/2018-08-14-intern-challenge/structure-after.png" description="After" %}

The idea of using a matchmaker interface helped us to separate concerns all over the code, to the point where we ended up with a much cleaner structure (as you can see above). In summary, our code now flows as follows:

[Server] -> [Lobby] -> [Tournament] -> [Match] -> [Game]
                             |
                       [Matchmaker]

Hopefully you'll agree that this is a much cleaner implementation.

## Lobbies and Tournaments!

An article like this isn't complete without some screenshots, so here is what a lobby looks like:

{% include image.html url="/img/blog/2018-08-14-intern-challenge/lobby.png" description="Example Lobby" %}

And here is the tournament bracket and ranking from the intern challenge:

{% include image.html url="/img/blog/2018-08-14-intern-challenge/bracket.jpg" description="Intern Challenge Tournament" %}

## Future Directions

We feel we've reached a good state in the structure of the code, but we need a major overhaul of our data flow paradigm. A telling code smell is the passing of a `TournamentEvents` interface from `Tournament` to `Match` and to `Game`, in order to pass events back concerning the start, end and moves within a game (to display all that visual goodness you can see in the previous images).

Rather than pass an event callback interface all the way down and break abstraction, or to work extremely hard to abstract and end up with a lot of boilerplate conversion code, we are now looking at other options, such as `PubSub` or `Reactive Streams`.

We'll bring you another blog post once we've figured out what the best architecture is, but until then, if you'd like to help us, please get in touch!

If you'd like us to organise an event similar to this one, also get in touch!
