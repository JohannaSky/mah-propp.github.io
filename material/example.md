---
id: M1
title: Introduktion
layout: material
quiz: Q1
link:
    - title: "Example link 1"
      url: "http://google.com"
    - title: "Example link 2"
      url: "http://google.com"
---

# Introduktion
Hej

## Rubriknivå 2

Lorem ipsum dolor sit amet, *kursiv text* consectetur adipiscing elit, **fetstilad text** sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Rubriknivå 3

Lorem ipsum dolor sit amet, `en bit kod i löpande text` consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

* Punktlista 1
* Punktlista 2
    * Punktlista i en lista
* Punktlista 3

1. Numrerad lista 1
2. Numrerad lista 2
    1. Numrerad lista i en lista
3. Numrerad lista 3

Lorem ipsum dolor sit amet, [Google](http://google.com) adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

<div class="video">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/QUIfNNfgXnU" frameborder="0" allowfullscreen></iframe>
</div>

#### Kodexempel

``` c++
// en simpel funktion som kollar om ett tal är noll
bool iszero(int val)
{
	bool iszero = false; // anta att val inte är noll
	if (val == 0)
		iszero = true; // status blir true om val är noll
	return iszero;		
}

int main()
{
	int val1 = rand(), val2 = rand(); // två slumpade värden
	
	if (!iszero(val2)) // tänk på !
	{
		cout << val1 / val2; // dela endast om val2 är annorlunda än 0
	}
}
```

#### Övningsfråga

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?

Lorem ipsum dolor sit amet, `en bit kod i löpande text` consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
{: .spoiler}

#### Bildexempel

![Bildbeskrivning](images/example.png) _1. Bildexempel_
